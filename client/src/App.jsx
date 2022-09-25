import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Typography, Button, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as app from "./firebase";
import UserContext from "./User";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "./components/Navbar";
import Calendar from "./components/Calendar";
import Timer from "./components/Timer";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
    const [themeState, setThemeState] = useState(false); //false == light, true == dark
    const lightTheme = createTheme({
        palette: {
            mode: "light",
        },
    });
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            background: {
                default: "#222222",
            },
        },
    });

    const [pomoList, setPomoList] = useState([]);

    const popPomodoro = () => {
        const newList = pomoList;
        newList.shift()
        setPomoList(newList);
        console.log(pomoList);
    };
    const addPomodoro = (task) => {
        const newList = pomoList;
        if (newList.length > 0) {
            newList.push({
                description: "Break",
                subject: "Break",
                duration: 5,
                id: uuidv4(),
            });
        }
        newList.push({
            ...task,
            duration: 25,
        });
        setPomoList(newList);
        console.log(pomoList);
    };
    useEffect(() => {
        setThemeState(JSON.parse(localStorage.getItem("theme")));
    }, []);

    const [user, loading, error] = useAuthState(app.auth);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (user === null) {
        return (
            <Button
                onClick={() => app.signIn()}
                variant="contained"
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                Sign In
            </Button>
        );
    }

    const switchTheme = () => {
        localStorage.setItem("theme", !themeState);
        setThemeState(!themeState);
    };

    return (
        <ThemeProvider theme={themeState ? darkTheme : lightTheme}>
            <CssBaseline />
            <UserContext.Provider
                value={{
                    userAuth: user,
                    switchTheme,
                    pomoList: pomoList,
                    pomoFunctions: {
                        popPomodoro,
                        addPomodoro,
                    },
                }}
            >
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={Home} />
                    <Route path="/calendar" component={Calendar} />
                    <Route path="/timer" component={Timer} />
                </Switch>
            </UserContext.Provider>
        </ThemeProvider>
    );
}

export default App;
