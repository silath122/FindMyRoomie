import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom'; // Import Link
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';

export default function IconBreadcrumbs() {
    return (
        <Breadcrumbs
         aria-label="breadcrumb"
         sx={{
             backgroundColor: 'lightgray', // Change background color
             padding: '10px',
             borderRadius: '5px',
             flexDirection: 'column',
             alignItems: 'flex-start',
         }}
        >
            <div>
                <Link to="/home" color="inherit">
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Home
                </Link>
            </div>
            <div>
                <Link to="/profile" color="white">
                    <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Profile
                </Link>
            </div>
            <div>
                <Link to="/matches" color="inherit">
                    <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Your Matches
                </Link>
            </div>
        </Breadcrumbs>
    );
}
