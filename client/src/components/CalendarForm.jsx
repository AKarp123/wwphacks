import React from "react";
import {
    TextField,
    Typography,
    Button,
    Divider,
    MenuItem,
    Select,
    InputLabel,
} from "@mui/material";
import {db} from "../firebase";
import UserContext from "../User";

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_SUBJECT":
            return { ...state, subject: action.payload };
        case "SET_DESCRIPTION":
            return { ...state, description: action.payload };
        case "SET_HOURS":
            return { ...state, hours: action.payload };
        case "SET_MINUTES":
            return { ...state, minutes: action.payload };
        case "SET_SECONDS":
            return { ...state, seconds: action.payload };
        case "SET_DAY":
            return { ...state, day: action.payload };
        case "SET_MONTH":
            return { ...state, month: action.payload };
        case "SET_YEAR":
            return { ...state, year: action.payload };
        case "SUBMIT":
            return {
                ...state,
                subject: "",
                description: "",
                hours: 0,
                minutes: 0,
                seconds: 0,
                day: 0,
                month: 0,
                year: 0,
            };
        default:
            return state;
    }
};
export default function CalendarForm() {
    const [state, dispatch] = React.useReducer(reducer, {
        subject: "",
        description: "",
        hours: 0,
        minutes: 0,
        seconds: 0,
        day: 0,
        month: 0,
        year: 0,
    });
    const { uid } = React.useContext(UserContext);


    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(new Date(state.year, state.month, state.day, state.hours, state.minutes, state.seconds));

        const query = db.collection(`users/${uid}/assignments`)

        await query.add({
            subject: state.subject,
            description: state.description,
            dueDate: new Date(state.year, state.month, state.day, state.hours, state.minutes, state.seconds),
        });

        dispatch({ type: "SUBMIT" });



    }

    return (
        <div style={{ justifyContent: "center" }}>
            <form>
                <TextField
                    id="outlined-basic"
                    label="Subject"
                    variant="outlined"
                    sx={{ marginRight: "5px" }}
                    onChange={(e) =>
                        dispatch({
                            type: "SET_SUBJECT",
                            payload: e.target.value,
                        })
                    }
                    value={state.subject}
                />
                <TextField
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    sx={{ marginRight: "5px" }}
                    onChange={(e) =>
                        dispatch({
                            type: "SET_DESCRIPTION",
                            payload: e.target.value,
                        })
                    }
                    value={state.description}
                />
                <TextField
                    id="outlined-basic"
                    label="Month"
                    variant="outlined"
                    sx={{ marginRight: "5px" }}
                    onChange={(e) =>
                        dispatch({
                            type: "SET_MONTH",
                            payload: e.target.value,
                        })
                    }
                    value={state.month}
                />
                <TextField
                    id="outlined-basic"
                    label="Day"
                    variant="outlined"
                    sx={{ marginRight: "5px" }}
                    onChange={(e) =>
                        dispatch({
                            type: "SET_DAY",
                            payload: e.target.value,
                        })
                    }
                    value={state.day}
                />
                <TextField
                    id="outlined-basic"
                    label="Year"
                    variant="outlined"
                    sx={{ marginRight: "5px" }}
                    onChange={(e) =>
                        dispatch({
                            type: "SET_YEAR",
                            payload: e.target.value,
                        })
                    }
                    value={state.year}
                />
                <InputLabel id="Hours">Hours</InputLabel>
                <Select
                    value={state.hours}
                    labelId="Hours"
                    sx={{ minWidth: "100px" }}
                    onChange={(e) =>
                        dispatch({ type: "SET_HOURS", payload: e.target.value })
                    }
                >
                    {Array.from(Array(24).keys()).map((hour) => (
                        <MenuItem value={hour}>{hour}</MenuItem>
                    ))}
                </Select>
                <TextField
                    id="outlined-basic"
                    label="Minutes"
                    variant="outlined"
                    sx={{ marginRight: "5px" }}
                    onChange={(e) =>
                        dispatch({
                            type: "SET_MINUTES",
                            payload: e.target.value,
                        })
                    }
                    value={state.minutes}
                />

                <Button
                    variant="contained"
                    color="primary"
                    sx={{ display: "block", marginTop: "10px" }}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </form>
        </div>
    );
}
