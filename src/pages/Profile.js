import React from "react";
import NavigationBar from "../NavigationBar";
import {Route, Routes} from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs";
import Grid from "@mui/material/Grid";


export default function Profile() {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={3}>

                    <NavigationBar/>

                </Grid>
                <Grid item xs={8}>
                    <div>

                        <div> Profile page</div>

                    </div>
                </Grid>
            </Grid>
        </div>
    );
}