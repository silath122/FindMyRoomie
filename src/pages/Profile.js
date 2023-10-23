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

                <div class = 'flex-item'>
                    <p>
                        Lorum ipsum
                    </p>
                    <p>
                        Lorum ipsum
                    </p>
                    <p>
                        Lorum ipsum
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




            </div>
                    </Grid>
                </Grid>
        </div>

    )
}
export default yourProfile;