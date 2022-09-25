import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";
import moment from "moment";
import { db } from "../firebase";
import UserContext from "../User";

export default function CalendarCard({ assignment }) {
    const { uid } = React.useContext(UserContext);
    const changeStatus = async () => {
        const query = db
            .collection("users")
            .doc(uid)
            .collection("assignments")
            .doc(assignment.id);

        await query.update({
            completed: !assignment.completed,
        });
    };

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Tooltip
                    title={
                        assignment.dueDate.toDate().toDateString() +
                        " @ " +
                        assignment.dueDate.toDate().toLocaleTimeString()
                    }
                    placement="top"
                >
                    <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        Due {moment(assignment.dueDate.toDate()).fromNow()}
                    </Typography>
                </Tooltip>

                <Typography variant="h5" component="div">
                    {assignment.subject}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {assignment.completed ? "Done" : "Not Done"}
                </Typography>
                <Typography variant="body2">
                    {assignment.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={changeStatus}>
                    Change Status
                </Button>
                <Button size="small">
                    Add to Pomodoro
                </Button>
            </CardActions>
        </Card>
    );
}
