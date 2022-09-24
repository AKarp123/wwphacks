import React from "react";
import UserContext from "../User";
import { Typography, Button } from "@mui/material";
import { signIn } from "../firebase";

export default function Home() {
    const user = React.useContext(UserContext);
    return (
        <div className="App">
            <Typography variant="h1">
                {user ? user.displayName : "Hello World"}
            </Typography>

            {user ? null : (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={signIn}
                >
                    Sign In
                </Button>
            )}
        </div>
    );
}
