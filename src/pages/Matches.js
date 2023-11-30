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
import {firestore, removeMatchFromFirestore, getUserDataByUID} from "../firebase";
import {updateDoc, setDoc, doc, getDoc} from "firebase/firestore";
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

        return() => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchMatches = async () => {
          try {
            if (currentUser) {
              const currUserId = currentUser.uid;
              const matchRef = doc(firestore, "matches", currUserId);
      
              // Fetch the document reference
              const matchDoc = await getDoc(matchRef);
      
              // Check if the document exists
              if (matchDoc.exists()) {
                // Access the data property of the document
                const matchesData = matchDoc.data();
      
                // Initialize an array to store fetched matches
                const fetchedMatches = [];
      
                // Loop through each field in the matches map
                for (const [otherUserId, matchData] of Object.entries(matchesData.matches || {})) {
                  if (matchData.status !== "not interested") {
                    const randomMatchPercentage = Math.floor(Math.random() * 100) + 1;
      
                    const userDoc = await firestore.collection("users").doc(otherUserId).get();
                    const userData = userDoc.data();
      
                    if (userData) {
                      const fetchedMatch = {
                        uid: otherUserId, // Assuming otherUserId is the UID of the different user
                        name: userData.name,
                        profileImage: userData.profileImage,
                        matchPercentage: randomMatchPercentage,
                        bio: userData.bio,
                      };
                      fetchedMatches.push(fetchedMatch);
                    }
                  }
                }
      
                setMatches(fetchedMatches);
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


    const message = async (currentUser, otherUser) => {
        try {
            const chatID1 = `${currentUser.uid}${otherUser.uid}`;
            const chatID2 = `${otherUser.uid}${currentUser.uid}`;
    
            const timestamp = new Date();
    
            // Update or create the document in userChats for the current user
            await updateOrCreateUserChat(currentUser.uid, chatID1, timestamp, otherUser);
    
            // Update or create the document in userChats for the other user
            await updateOrCreateUserChat(otherUser.uid, chatID2, timestamp, currentUser);
    
            navigate("/messages");
        } catch (error) {
            console.error("Error sending message:", error);
            
        }
    };
    
    const updateOrCreateUserChat = async (userID, chatID, timestamp, otherUser) => {
        const userChatsRef = doc(firestore, "userChats", userID);
    
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
                    userInfo: {
                        name: otherUser.name,
                        profileImage: otherUser.profileImage,
                        uid: otherUser.uid,
                    },
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
                    userInfo: {
                        name: otherUser.name,
                        profileImage: otherUser.profileImage,
                        uid: otherUser.uid,
                    },
                },
            });
        }
    };



    // const [matches, setMatches] = useState([
    //     {
    //         name: "Jenna Roux",
    //         image: require("../pictures/jenna.png"),

    //         bio: "Hi, I'm Jenna! I'm a business major at CofC. I'm looking for two roommates to live with as I go into my Junior year of College.",
    //         matchPercentage: 73,
    //     },
    //     {
    //         name: "Sophia Jenkins",
    //         image: require("../pictures/sophia.png"),
    //         bio: "Hi, I'm Sophia, and I'm a college student in my early twenties majoring in Computer Science. I'm excited about my upcoming semester in a new city and looking forward to making the most of my college experience. I'm friendly, responsible, and eager to find roommates who share similar values and can create a supportive and enjoyable living environment.",
    //         matchPercentage: 55,
    //     },
    //     {
    //         name: "Sarah Stewart",
    //         image: require("../pictures/sarah.png"),
    //         bio: "I'm a college senior majoring in Environmental Science. With a passion for sustainability, I'm excited about my final year and eager to make eco-conscious choices in my new living space. I'm friendly, outgoing, and looking for roommates who value a green lifestyle and enjoy outdoor adventures.",
    //         matchPercentage: 95,
    //     },
    //     {
    //         name: "Lilly Quinn",
    //         image: require("../pictures/lilly.png"),
    //         bio: "I'm a freshman studying Literature and dreaming of becoming a published author someday. I'm a bookworm, an introvert, and I adore cozy evenings with a good book. I'm hoping to find roommates who share my love for literature and appreciate a quiet and book-friendly environment.",
    //         matchPercentage: 82,
    //     },
    // ]);


    const removeMatch = async (match) => {
        try {
            await removeMatchFromFirestore(currentUser, match);
    
            // update state and to remove match from UI matches page forever
            const updatedMatches = matches.filter((m) => m.uid !== match.uid);
            setMatches(updatedMatches);
        } catch (error) {
            console.error("Error marking match as not interested:", error);
        }
    };

    return (
        <div>
            <Navbar maxWidth="lg" />
            {loading && <p>Loading...</p>}
            {!loading && currentUser &&(
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Sidebar />
                </Grid>
                <Grid item xs={8} alignItems="center">
                    <Box
                        align="center"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            gap: "10px",
                        }}
                    >
                        <div>
                            <Typography sx={{ fontFamily: "Segoe UI Symbol", fontSize: "30px", paddingLeft: "115px" }}>
                                Your Matches
                            </Typography>
                        </div>
                        {matches.length === 0 ? (
                            <p>No matches found.</p>
                            ) : (
                        matches.map((match, index) => (
                            <Card key={index} sx={{ width: 600, Height: 200, align: "center", marginTop: "10px" }}>
                                <Box display="flex">
                                    <CardMedia
                                        component="img"
                                        height="70%"
                                        alt={match.name}
                                        src={match.profileImage} // Assuming profileImage is a URL
                                        sx={{
                                            marginTop: "20px",
                                            justifyContent: "center",
                                            width: "100px",
                                            height: "120px",
                                            padding: "10px",
                                        }}
                                    />
                                    <CardContent>
                                        <Typography
                                            variant="h5"
                                            component="div"
                                            align="right"
                                            sx={{ marginBottom: "10px", justifyContent: "right" }}
                                        >
                                            {match.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            align="right"
                                        >
                                            {match.bio}
                                        </Typography>
                                        <Typography
                                            variant="h5"
                                            component="div"
                                            align="right"
                                            color="blue"
                                            sx={{ marginTop: "10px", textAlign: "right" }}
                                        >
                                            {match.matchPercentage}% Match
                                        </Typography>
                                    </CardContent>
                                </Box>
                                <Box
                                    alignItems="center"
                                    sx={{ align: "center", justifyContent: "center", padding: "10px" }}
                                >
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() => message(currentUser, match)}
                                        sx={{ color: "green", borderColor: "green", paddingRight: "10px", mx: 2 }}
                                    >
                                        Message Now
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() => removeMatch(match)}
                                        sx={{ color: "red", borderColor: "red", paddingLeft: "10px" }}
                                    >
                                        Not Interested
                                    </Button>
                                </Box>
                            </Card>
                        ))
                        )}
                    </Box>
                </Grid>
            </Grid>
            )}
        </div>
    );
}

//     return(
//         <div>
//             <Navbar   maxWidth="lg"/>
//             <Grid container spacing={2}>
//                 <Grid item xs={2}>

//                     <Sidebar/>

//                 </Grid>
//                 <Grid item xs={8}
//                       alignItems="center" >
//                     <Box align= 'center' style={{
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         flexDirection: 'column', // Center items vertically
//                         gap: '10px',

//                     }}>
//                     <div>
//                         <Typography sx={{ fontFamily: 'Segoe UI Symbol',fontSize:'30px', paddingLeft: '115px'}}> Your Matches</Typography>
//                     </div>
//                         {matches.map((match, index) => (
//                             <Card
//                                 key={index}
//                                 sx={{ width: 600, Height: 200, align: 'center', marginTop: '10px' }}
//                             >
//                                 <Box display="flex">
//                                     <CardMedia
//                                         component="img"
//                                         height="70%"
//                                         image={match.image}
//                                         alt={match.name}

//                                         sx={{ marginTop:'20px',  justifyContent: 'center', width: "100px", height: "120px", padding: '10px' }}
//                                     />
//                                     <CardContent>
//                                         <Typography variant="h5" component="div" align= "right" sx={{marginBottom:'10px', justifyContent: 'right'}}>
//                                             {match.name}
//                                         </Typography>
//                                         <Typography variant="body2" color="text.secondary" align= "right">
//                                             {match.bio}
//                                         </Typography>
//                                         <Typography variant="h5" component="div" align= "right" color="blue" sx={{ marginTop: '10px', textAlign: 'right' }}>
//                                             {match.matchPercentage}% Match
//                                         </Typography>
//                                     </CardContent>
//                                 </Box>

//                                     <Box
//                                         alignItems="center"
//                                         sx={{ align: 'center', justifyContent: 'center', padding:'10px' }}
//                                     >
//                                     <Button size="small"
//                                             variant="outlined"
//                                             onClick={() => message(currentUser, match)}
//                                             sx={{ color: 'green',  borderColor: 'green', paddingRight:'10px', mx: 2 }}
//                                     >
//                                         Message Now</Button>
//                                     <Button size="small"
//                                             variant="outlined"
//                                             onClick={() => removeMatch(match)}
//                                             sx={{ color: 'red',  borderColor: 'red',paddingLeft:'10px' }} >Not Interested </Button>
//                                     </Box>

//                                 <Box align= 'center'
//                                     sx={{ align: 'center', paddingBottom: '10px', paddingLeft: '100px'}}
//                                 >

//                                 </Box>
//                             </Card>
//                         ))}
//                     </Box>
//                 </Grid>
//             </Grid>
//         </div>
//     );
// }