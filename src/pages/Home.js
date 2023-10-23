import React, {useEffect, useState} from "react";
import Sidebar from "../Sidebar";
import {Route, Routes, useNavigate} from "react-router-dom";
import Profile from "./Profile"
import Breadcrumbs from "../Breadcrumbs"
import {
    Box,
    Button,
    Card, CardActions,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    Switch,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import {Col} from "react-bootstrap";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, firestore} from "../firebase";
import {collection, getDocs, query, where,} from "firebase/firestore";
import Navbar from "../components/Navbar";


export default function Home() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [fn, sfn] =useState("");


    const fetchUserName = async () => {
        try {
            const q = query(collection(firestore, "users"), where("uid", "==", user?.uid));
            console.log("query= ", q);
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            console.log("data ", data);

            setName(data.name);
        } catch (err) {
            console.error(err);
        }
    };





    useEffect(() => {


        fetchUserName();

    }, [user, loading, ]);
    return (
        <div>
            <Navbar/>
            <Grid container spacing={2}>
                <Grid item xs={2}>

                    <Sidebar/>

                </Grid>
                <Grid item xs={8}>
                    <Box align= 'center' style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column', // Center items vertically
                        gap: '10px',

                    }}>
                    <Typography variant="h6"  sx={{paddingTop: '15px', paddingLeft: '65px'}}>
                        Welcome Back, {name}                    </Typography>
                    </Box>
                        <Box style={{
                            alignItems: 'left',
                            paddingLeft: '110px'
                        }}>
                        <div>Top Matches: </div>
                        </Box>
                    <Box align= 'center' style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column', // Center items vertically
                        gap: '10px',

                    }}>
                    <Card sx={{ width: 800, Height: 50, align: 'center', marginTop: '10px' }}>
                        <Box display="flex" >
                            <CardMedia
                                component="img"
                                height="50%"
                                image={require("../pictures/jenna.png")}
                                alt="Sarah Stewart"
                                sx={{ width: "100px", height: "120px", padding: '10px' }}
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
                        </Box>
                        <CardActions>
                            <Button size="small">Message Now</Button>
                        </CardActions>
                    </Card>
                    <Card sx={{ width: 800, Height: 50, align: 'center', marginTop: '10px'  }}>
                        <Box display="flex">
                            <CardMedia
                                component="img"
                                height="100%"
                                image={require("../pictures/lilly.png")}
                                alt="Sophia Jenkins"
                                sx={{ width: "100px", height: "130px", padding: '10px' }}
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
                        </Box>
                        <CardActions>
                            <Button size="small">Message Now</Button>
                        </CardActions>
                    </Card>
                    </Box>
                    <Box style={{
                        alignItems: 'left',
                        paddingLeft: '110px',
                        paddingTop: '20px'
                    }}>
                    </Box>


                </Grid>
            </Grid>
        </div>

    );
}