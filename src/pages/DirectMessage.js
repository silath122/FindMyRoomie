import React from "react";
import Navbar from "../components/Navbar"
import Chat from "../components/Chat"
import MessageNav from "../components/MessageNav";
import "../styling/DirectMessage.css";
import Sidebar from "../Sidebar";
import Grid from "@mui/material/Grid";


function DirectMessage() {
    return (
        <div className="DirectMessagePage">
            <Navbar/>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Sidebar/>

                </Grid>
                <Grid item xs={8}>
                    <div className="pageContainer">
                        <div className="container">

                            <MessageNav/>
                            <Chat/>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default DirectMessage;