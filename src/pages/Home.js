import React from "react";
import NavigationBar from "../NavigationBar";
import {Route, Routes} from "react-router-dom";
import Profile from "./Profile"
import Breadcrumbs from "../Breadcrumbs"
import {Box, Button, Divider, Grid, Switch, TextField, Typography, useTheme} from "@mui/material";
import {Col} from "react-bootstrap";


export default function home() {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={3}>

                    <NavigationBar/>

                </Grid>
                <Grid item xs={8}>
                    <div>

                        <div> Home page</div>

                    </div>
                </Grid>
            </Grid>
        </div>

    );
}