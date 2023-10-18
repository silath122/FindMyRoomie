import Navbar from "../components/Navbar";
import React, {useEffect} from "react";
import {Grid, Typography, Box} from "@mui/material";
import Sidebar from "../Sidebar";
import {useNavigate} from "react-router-dom";
import {TailSpin, Triangle} from "react-loader-spinner";

export default function LoadingPage(){
    const navigate = useNavigate();

    useEffect(() => {

        const delay = 3000;
        const timer = setTimeout(() => {


            // Use the navigate function to redirect to the next page
            navigate('/Matches');
        }, delay);

        // Clear the timer when the component unmounts to avoid any issues
        return () => clearTimeout(timer);
    }, [navigate]);


    return(
        <div>
            <Navbar/>
            <Grid container spacing={2}>
                <Grid item xs={2}>

                    <Sidebar/>

                </Grid>
                <Grid item xs={10}
                      alignItems="center"

                >
                    <Box align= 'center' style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '30vh',
                        flexDirection: 'column', // Center items vertically
                        gap: '30px',
                    }}>
                    <Typography align= 'center' sx={{paddingTop: '50px',paddingBotton: '10px'}}> Please wait as we load your matches</Typography>
                    <TailSpin  align='center'    color= 'black'
                               sx={{display: 'flex',
                                  justifyContent:'center',
                                   alignItems: 'center',

                               }}
                    />
                    </Box>
                </Grid>
            </Grid>


        </div>
    )
}