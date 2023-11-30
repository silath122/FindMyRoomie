import Sidebar from "../Sidebar";
import {Route, Routes, useNavigate} from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs";
import Grid from "@mui/material/Grid";
import {Card,CardActions, CardContent, CardMedia, Typography, Button, Box, Accordion
} from "@mui/material";
import Navbar from "../components/Navbar"
import {registerWithEmailAndPassword} from "../firebase";
import Toastify from 'toastify-js'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useEffect } from "react";
import {firestore} from "../firebase";
import {updateDoc, setDoc, doc, getDoc, getFirestore, arrayRemove} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Matches() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                if (currentUser) {
                    const currUserId = currentUser.uid;
                    

                    // get matches document from "matches" collection
                    const matchRef = doc(firestore, "matches", currUserId);
                    const matchDoc = await getDoc(matchRef);

                    
                    if (matchDoc.exists()) {
                        
                        const matchesData = matchDoc.data();

                        // check if the "matches" field is an array
                        if (Array.isArray(matchesData.matches)) {
                           const fetchedMatches = [];

                           // Loop through each UID in the filter matches
                           for (const otherUserId of matchesData.matches) {

                            // get user data from "users" collection
                            const userDocRef = doc(firestore, "users", otherUserId);
                            const userDoc = await getDoc(userDocRef);
                            const userData = userDoc.data();

                            // get survey data from "surveys" collection
                            const surveyDocRef = doc(firestore, "surveys", otherUserId);
                            const surveyDoc = await getDoc(surveyDocRef);
                            const surveyData = surveyDoc.data();

                            if (userData && surveyData) {
                                const matchPercentage = 77;//calculateMatchPercentage(surveyData.currUserId, surveyData.otherUserId);
                                const fetchedMatch = {
                                    uid: userData.uid,
                                    name: userData.name,
                                    profileImage: userData.profileImage,
                                    bio: surveyData.surveyData.bio,
                                    //matchPercentage: matchPercentage,
                                };
                                fetchedMatches.push(fetchedMatch);
                            }
                           }
                           setMatches(fetchedMatches);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching matches:", error);
            }
        };

        if (!loading && currentUser) {
            fetchMatches();
        }
    }, [currentUser, loading]);

    // const calculateMatchPercentage = async (currentUserSurvey, otherUserSurvey) => {
    //     // Define weights for different survey questions and choices
    //     const weights = {
    //         grade: {freshman: 1, sophmore: 2, junior: 3, senior: 4},
    //         smoke: { yes: 2, no: 1 },
    //         drink: { socially: 2, never: 1, 'once or twice a week': 3, 'More than twice a week': 4}, 
    //         pets: { yes: 2, no: 1 },
    //         studyAmount: {'0-1 hour(s)': 1, '2-3 hours': 2, '3-4 hours': 3, '4+ hours':4},
    //         bedtime: {'before 10': 1, '10-11': 2, 'midnight': 3, 'after midnight': 4},
    //         wakeup: {'before 6': 1, '7-8': 2, '9-10': 3, '11 or later': 4},
    //         friendliness: {1: 1, 2: 2, 3: 3, 4: 4, 5: 5},
    //         cleanliness: {1: 1, 2: 2, 3: 3, 4: 4, 5: 5},
    //         closeness: {1: 1, 2: 2, 3: 3, 4: 4, 5: 5},
    //         workhours: {'dont': 1, '5-10': 2, '11-20': 3, '21-30': 4, 'full time': 5},
    //         roommateamount: {'1': 1, '2': 2, '3': 3, '4 or more': 4},

    //     };
    
    //     // Calculate the weighted sum of the choices
    //     let weightedSum = 0;
    
    //     for (const question in weights) {
    //         if (currentUserSurvey[question] && otherUserSurvey[question]) {
    //             const currentUserResponse = currentUserSurvey[question];
    //             const otherUserResponse = otherUserSurvey[question];
    //             const weight = weights[question];
    
    //             // You may need to customize this based on the type of question (multiple-choice, dropdown, etc.)
    //             const currentUserWeight = weight[currentUserResponse] || 0;
    //             const otherUserWeight = weight[otherUserResponse] || 0;
    
    //             weightedSum += Math.abs(currentUserWeight - otherUserWeight);
    //         }
    //     }
    
    //     // Normalize the result to get a percentage
    //     const maxPossibleWeight = Object.values(weights).reduce(
    //         (acc, weight) =>
    //             acc +
    //             (typeof weight === 'number'
    //                 ? weight
    //                 : Object.values(weight).reduce((choiceAcc, choiceWeight) => choiceAcc + choiceWeight, 0)),
    //         0
    //     );
    //     const matchPercentage = Math.max(0, 100 - (weightedSum / maxPossibleWeight) * 100);
    
    //     return matchPercentage;
    // };


    // // method logs all matches and see's the contains of each match in the console.log
    // useEffect(() => {
    //     console.log("Matches:", matches);
    // }, [matches]);


    const message = async (currentUser, otherUser) => {
        try {

            // user info on other user
            const otherUserDocRef = doc(firestore, "users", otherUser.uid);
            const otherUserDoc = await getDoc(otherUserDocRef);
            const otherUserData = otherUserDoc.data();

            // current user info
            const currentUserDocRef = doc(firestore, "users", currentUser.uid);
            const currentUserDoc = await getDoc(currentUserDocRef);
            const currentUserData = currentUserDoc.data();

            const chatID1 = currentUser.uid > otherUser.uid ? currentUser.uid + otherUser.uid : otherUser.uid + currentUser.uid;

            if (otherUserData) {
                // Construct the otherUser object with the necessary properties
                const otherUserInfo = {
                    uid: otherUser.uid,
                    name: otherUserData.name,
                    profileImage: otherUserData.profileImage,
                };


                const timestamp = new Date();
    
                // Update or create the document in userChats for the current user
                await updateOrCreateUserChat(currentUser.uid, chatID1, timestamp, otherUserInfo);
    

                console.log("Message button successfully implemented for otherUser");
    
            } else {
                console.error("Other user data not found: ", otherUser.uid);
            }

            if (currentUserData) {
                // Construct the otherUser object with the necessary properties
                const currentUserInfo = {
                    uid: currentUser.uid,
                    name: currentUserData.name,
                    profileImage: currentUserData.profileImage,
                };

                const timestamp = new Date();
    
                // Update or create the document in userChats for the other user
                await updateOrCreateUserChat(otherUser.uid, chatID1, timestamp, currentUserInfo);

                console.log("Message button successfully implemented for currentUser");
                
            } else {
                console.error("Other user data not found: ", currentUser.uid);
            }

            
            if (otherUserData) {
                // Construct the otherUser object with the necessary properties
                const otherUserInfo = {
                    uid: otherUser.uid,
                    name: otherUserData.name,
                    profileImage: otherUserData.profileImage,
                };

                // run once the process of updating userChats is complete
                await removeMatch(otherUserInfo);

            } else {
                console.error("Other user data not found: ", otherUser.uid);
            }

            navigate("/messages");

        
        } catch (error) {
            console.error("Error sending message:", error);
            
        }
    };
    
    const updateOrCreateUserChat = async (userID, chatID, timestamp, otherUser) => {
        try {
        const userChatsRef = doc(firestore, "userChats", userID);

        console.log("userChatsRef:", userChatsRef);
    
        // current userChats doc
        const userChatsDoc = await getDoc(userChatsRef);
    
        if (userChatsDoc.exists()) {
            // if the doc exists, update it
            await updateDoc(userChatsRef, {
                [chatID]: {
                    date: timestamp,
                    lastMessage: {
                        text: "test", // may need to update this <-- carter
                    },
                    userInfo: otherUser,
                },
            });
        } else {
            // otherwise create
            await setDoc(userChatsRef, {
                [chatID]: {
                    date: timestamp,
                    lastMessage: {
                        text: "test", // may need to update this <-- carter
                    },
                    userInfo: otherUser,
                },
            });
        }
        } catch (error) {
            console.error("Error updating or creating userChats document:", error);
        }
    };


    const removeMatch = async (match) => {
        try {
            const currentUserId = currentUser.uid;
            const otherUserId = match.uid;

            console.log("Removing match:", match);

            // remove other users match from the current users "matches" collection
            const currentUserRef = doc(getFirestore(), "matches", currentUserId);
            await updateDoc(currentUserRef, {
                matches: arrayRemove(otherUserId)
            });

            console.log("Match removed from current user's matches.")

            // remove current users match from other users "matches collection"
            const otherUserRef = doc(getFirestore(), "matches", otherUserId);
            await updateDoc(otherUserRef, {
                matches: arrayRemove(currentUserId)
            });

            console.log("Current user removed from other user's matches.")

            // update state to remove the match from UI matches page
            const updatedMatches = matches.filter((m) => m.uid !== otherUserId);
            setMatches(updatedMatches);

            console.log("Matches have all been successfully removed");

        } catch (error) {
            console.error("Error deleting match:", error);
        }
    };

        return(
        <div>
            <Navbar   maxWidth="lg"/>
            <Grid container spacing={2}>
                <Grid item xs={2}>

                    <Sidebar/>

                </Grid>
                <Grid item xs={8}
                      alignItems="center" >
                    <Box align= 'center' style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column', // Center items vertically
                        gap: '10px',

                    }}>
                    <div>
                        <Typography sx={{ fontFamily: 'Segoe UI Symbol',fontSize:'30px', paddingLeft: '115px'}}> Your Matches</Typography>
                    </div>
                        {matches.map((match, index) => (
                            <Card
                                key={index}
                                sx={{ width: 600, Height: 200, align: 'center', marginTop: '10px' }}
                            >
                                <Box display="flex">
                                    <CardMedia
                                        component="img"
                                        height="70%"
                                        image={match.profileImage}
                                        alt={match.name}

                                        sx={{ marginTop:'20px',  justifyContent: 'center', width: "100px", height: "100px", padding: '10px' }}
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
                                            onClick={() => message(currentUser, match)}
                                            sx={{ color: 'green',  borderColor: 'green', paddingRight:'10px', mx: 2 }}
                                    >
                                        Message Now</Button>
                                    <Button size="small"
                                            variant="outlined"
                                            onClick={() => removeMatch(match)}
                                            sx={{ color: 'red',  borderColor: 'red',paddingLeft:'10px' }} >Not Interested </Button>
                                    </Box>

                                <Box align= 'center'
                                    sx={{ align: 'center', paddingBottom: '10px', paddingLeft: '100px'}}
                                >

                                </Box>
                            </Card>
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}