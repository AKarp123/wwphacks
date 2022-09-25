import React from "react";
import Countdown from "react-countdown";
import UserContext from "../User";
import {
    Button,
    Container,
    Divider,
    Grid,
    Typography,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";

export default function Timer() {
    const data = React.useContext(UserContext);
    const pomoListT = data.pomoList;
    const [pomoList, setPomoList] = React.useState(pomoListT);
    const [tick, setTick] = React.useState(0);
    console.log("first", pomoList);
    React.useEffect(() => {
        console.log("useEffect", pomoList);
    }, [pomoList, tick]);

    if (data.pomoList.length === 0) {
        return <div>Add some tasks to your list!</div>;
    }

    const handleComplete = () => {
        const temp = pomoList;
        temp.shift();
        console.log("temp", temp);
        setPomoList(temp);
        console.log("pomoList", pomoList);
    };
    return (
        <Container maxWidth="xl">
            <Countdown
                date={Date.now() + 1000 * 60 * 25}
                renderer={TimerDisplay}
                onComplete={handleComplete}
                autoStart={false}
                key={pomoList[0].id}
            />

            <Divider sx={{ my: "20px" }} />

            <Grid item xs={12}>
                <List>
                    {pomoList.map((pomo) => (
                        <ListItem key={pomo.id}>
                            <ListItemText
                                primary={pomo.description}
                                secondary={pomo.subject + " - " + pomo.duration + " minutes"}
                            />
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </Container>
    );
}

const TimerDisplay = ({ hours, minutes, seconds, api }) => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h1" sx={{ textAlign: "center" }}>
                    {hours}:{minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                </Typography>
            </Grid>
            <Grid item xs={5}></Grid>
            <Grid item xs={1}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => api.start()}
                >
                    Start
                </Button>
            </Grid>
            <Grid item xs={1}>
                <Button variant="contained" onClick={() => api.pause()}>
                    Pause
                </Button>
            </Grid>
            <Grid item xs={5}></Grid>
        </Grid>
    );
};
