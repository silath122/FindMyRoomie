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
import {collection, getDocs, query, where} from "firebase/firestore";
import Navbar from "../components/Navbar";


export default function Home() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");


    const fetchUserName = async () => {
        try {
            const q = query(collection(firestore, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();

            setName(data.name);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
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
                    <div>
                        Welcome Back, {name}
                    </div>
                        <div>Top Matches: </div>
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