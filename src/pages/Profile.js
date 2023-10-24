import "../styling/Profile.css"
import React from "react";
import Navbar from "../components/Navbar";
import Grid from "@mui/material/Grid";
import Sidebar from "../Sidebar";
function yourProfile(){
    return(
        // upload and delete image function
        // connect to survey and show results, as well as allow editing of survey answers
        <div class = "yourProfile">
            <Navbar/>

                <Grid container spacing={2}>
                    <Grid item xs={2}>

                        <Sidebar/>

                    </Grid>
                    <Grid item xs={8}
                          alignItems="center" >
            <div className='flex-container'>

                <div class = 'flex-survey'>
                    <p>
                        Age:
                    </p>
                    <p>
                        Study Hours:
                    </p>
                    <p>
                        Typically go to sleep at:
                    </p>
                    <p>
                        Typically Wake up at:
                    </p>
                    <p>
                        Extroverted:
                    </p>
                    <p>
                        Friendship with roommates:
                    </p>
                    <p>
                        Cleanliness::
                    </p>
                    <p>
                        Hours worked:
                    </p>
                    <p>
                        Number of roommates:
                    </p>
                </div>

                <div class = 'flex-item'>
                    <p>
                        <button>
                            update Photos button
                        </button>
                    </p>
                    <p>
                        <button>
                            update roommate preferences
                        </button>
                    </p>
                </div>
                <div class = 'flex-user'>
                    <p>
                        Alexa Padberg
                    </p>
                    <p>
                        padberga@g.cofc.edu
                    </p>
                     <p>
                        Senior Year
                    </p>
                    <p>
                        College of Charleston
                    </p>
                </div>




            </div>
                    </Grid>
                </Grid>
        </div>

    )
}
export default yourProfile;