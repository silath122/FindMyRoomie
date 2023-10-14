import React from "react";
import Sidebar from "../Sidebar";
import {Route, Routes} from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs";
import Grid from "@mui/material/Grid";
import {Card,CardActions, CardContent, CardMedia, Typography, Button
} from "@mui/material";


export default function Matches() {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={2}>

                    <Sidebar/>

                </Grid>
                <Grid item xs={8}
                      alignItems="center" >
                    <div>
                        <Typography sx={{ fontFamily: 'Segoe UI Symbol',fontSize:'20px', textAlign:'center'}}> your matches</Typography>
                    </div>
                    <Card sx={{ width: 800, Height: 50, alignItem: 'right',  marginTop: '10px'  }}>
                        <CardMedia

                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Jenna Roux
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                               Bio: Hi, I'm Jenna! I'm looking for two roommates to live with as
                                I go into my Junior year of College.
                            </Typography>
                            <Typography variant="h5" component="div" color="blue"
                                        sx={{ marginTop:'10px', textAlign: 'right' }}>
                               73% Match
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Message Now</Button>
                        </CardActions>
                    </Card>
                    <Card sx={{ width: 800, Height: 50, align: 'center',  marginTop: '10px'  }}>
                        <CardMedia

                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Sophia Jenkins
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Hi, I'm Alex, and I'm a college student in my early twenties majoring in Computer Science.
                                I'm excited about my upcoming semester in a new city and looking forward to making the most
                                of my college experience. I'm friendly, responsible, and eager to find roommates who share
                                similar values and can create a supportive and enjoyable living environment.
                            </Typography>
                            <Typography variant="h5" component="div" color="blue"
                                        sx={{ marginTop:'10px', textAlign: 'right' }}>
                                55% Match
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Message Now</Button>
                        </CardActions>
                    </Card>
                    <Card sx={{ width: 800, Height: 50, align: 'center', marginTop: '10px' }}>
                        <CardMedia

                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Sarah Stewart
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                I'm a college senior majoring in Environmental Science.
                                With a passion for sustainability, I'm excited about my final year and eager
                                to make eco-conscious choices in my new living space. I'm friendly, outgoing,
                                and looking for roommates who value a green lifestyle and enjoy outdoor adventures.
                            </Typography>
                            <Typography variant="h5" component="div" color="blue"
                                        sx={{ marginTop:'10px', textAlign: 'right' }}>
                                95% Match
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Message Now</Button>
                        </CardActions>
                    </Card>
                    <Card sx={{ width: 800, Height: 50, align: 'center', marginTop: '10px'  }}>
                        <CardMedia

                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Lilly Quinn
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                I'm a freshman studying Literature and dreaming of
                                becoming a published author someday. I'm a bookworm, an introvert,
                                and I adore cozy evenings with a good book. I'm hoping to find
                                roommates who share my love for literature and appreciate a quiet and
                                book-friendly environment.
                            </Typography>
                            <Typography variant="h5" component="div" color="blue"
                                        sx={{ marginTop:'10px', textAlign: 'right' }}>
                                82% Match
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Message Now</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}