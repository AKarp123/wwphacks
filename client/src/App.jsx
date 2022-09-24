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
    useEffect(() => {
        setThemeState(JSON.parse(localStorage.getItem("theme")));
    }, [])
    console.log(themeState)
    const [user, loading, error] = useAuthState(app.auth);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    const switchTheme = () => {
        localStorage.setItem("theme", !themeState);
        setThemeState(!themeState);
    };

    return (
        <ThemeProvider theme={themeState ? darkTheme : lightTheme}>
            <CssBaseline />
            <UserContext.Provider value={{ ...user, switchTheme }}>
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
