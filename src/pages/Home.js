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
    const navigate = useNavigate();
    const message = () => {

        navigate ("/messages");
    };
    const chats = collection(firestore, "userChats");
    const lastMessage = chats?.text || "We're sorry, but no messages are available. Go to the message page to message users";

    console.log("chats= ", chats.lastMessage);
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

    const [matches, setMatches] = useState([
        {
            name: "Jenna Roux",
            image: require("../pictures/jenna.png"),

            bio: "Hi, I'm Jenna! I'm a business major at CofC. I'm looking for two roommates to live with as I go into my Junior year of College.",
            matchPercentage: 73,
        },
        {
            name: "Sophia Jenkins",
            image: require("../pictures/sophia.png"),
            bio: "Hi, I'm Sophia, and I'm a college student in my early twenties majoring in Computer Science. I'm excited about my upcoming semester in a new city and looking forward to making the most of my college experience. I'm friendly, responsible, and eager to find roommates who share similar values and can create a supportive and enjoyable living environment.",
            matchPercentage: 55,
        },
        {
            name: "Sarah Stewart",
            image: require("../pictures/sarah.png"),
            bio: "I'm a college senior majoring in Environmental Science. With a passion for sustainability, I'm excited about my final year and eager to make eco-conscious choices in my new living space. I'm friendly, outgoing, and looking for roommates who value a green lifestyle and enjoy outdoor adventures.",
            matchPercentage: 95,
        },
        {
            name: "Lilly Quinn",
            image: require("../pictures/lilly.png"),
            bio: "I'm a freshman studying Literature and dreaming of becoming a published author someday. I'm a bookworm, an introvert, and I adore cozy evenings with a good book. I'm hoping to find roommates who share my love for literature and appreciate a quiet and book-friendly environment.",
            matchPercentage: 82,
        },
    ]);

    const topMatches = matches
        .sort((a, b) => b.matchPercentage - a.matchPercentage)
        // Sort in descending order
        .slice(0, 2);
    // Get top 2 matches




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
                            paddingLeft: '150px',
                            paddingBottom:'30px'
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
                        {topMatches.map((match, index) => (
                        <Card
                            key={index}
                            sx={{ width: 600, Height: 200, align: 'center', marginTop: '10px' }}
                        >
                            <Box display="flex">
                                <CardMedia
                                    component="img"
                                    height="70%"
                                    image={match.image}
                                    alt={match.name}

                                    sx={{ marginTop:'20px',  justifyContent: 'center', width: "100px", height: "120px", padding: '10px' }}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div" align= "right" sx={{marginBottom:'10px', justifyContent: 'right'}}>
                                        {match.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" align= "right">
                                        {match.bio}
                                    </Typography>
                                    <Typography variant="h5" component="div" align= "right" color="blue" sx={{ marginTop: '10px', textAlign: 'right' }}>
                                        {match.matchPercentage}% Match
                                    </Typography>
                                </CardContent>
                            </Box>

                            <Box
                                alignItems="center"
                                sx={{ align: 'center', justifyContent: 'center', padding:'10px' }}
                            >
                                <Button size="small"
                                        variant="outlined"
                                        onClick={message}
                                        sx={{ color: 'green',  borderColor: 'green', paddingRight:'10px', mx: 2 }}
                                >
                                    Message Now</Button>

                            </Box>

                            <Box align= 'center'
                                 sx={{ align: 'center', paddingBottom: '10px', paddingLeft: '100px'}}
                            >

                            </Box>
                        </Card>
                        ))}

                    </Box>
                    <Box style={{
                        alignItems: 'left',
                        paddingLeft: '110px',
                        paddingTop: '20px'
                    }}>
                    </Box>


                <Box style={{

                    paddingLeft: '150px',
                    paddingBottom:'30px'
                }}>
                    <div>Your latest message:</div>

                </Box>

                        {chats && chats.lastMessage && chats.lastMessage.text ? (
                            <Box  sx={{ justifyContent: 'flex-end', margin: '5px', marginTop:'10px', display: "block", border:1, padding: '10px', marginLeft:'70px', width: '500px'}}>
                                <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Box className="chat-container"
                                         alignItems='right'
                                         style={{ display: 'flex', justifyContent: 'flex-end' }}
                                         sx={{

                                             border: '5px solid #666',
                                             borderRadius: '30px',
                                             WebkitBorderRadius: '30px',
                                             width: '200px',
                                             MozBorderRadius: '30px',
                                             margin: '40px',
                                             padding: '10px',
                                             display: 'inline-block',
                                             position: 'relative',
                                             height: 'auto',
                                             backgroundColor: 'white' }}>
                                        <Typography>{chats.lastMessage}</Typography>
                                        <Box
                                            sx={{
                                                content: '""',
                                                position: 'absolute',
                                                bottom: '-4.6px',
                                                right: '-3.5px',

                                                borderTop: '20px solid transparent',
                                                borderRight: '20px solid #666',

                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Box>

                        ) : (
                            <Box className="no-chat-container" sx={{ margin: '5px', marginTop:'10px', display: "block", border:1, padding: '10px', marginLeft:'230px', width: '500px'}}>
                                <p>We're sorry, but no messages are available. Go to the message page to message users</p>
                            </Box>
                        )}



                </Grid>
            </Grid>
        </div>

    );
}