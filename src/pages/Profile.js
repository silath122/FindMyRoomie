import "../styling/Profile.css"
import React, {useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import Grid from "@mui/material/Grid";
import Sidebar from "../Sidebar";
import {collection, getDocs, query, where, doc, getDoc} from "firebase/firestore";
import {firestore, auth} from "../firebase";
import {getAuth, onAuthStateChanged} from 'firebase/auth';


// To do
/*
- Authentication to see if email is actually real
- Make upload an image button function
- Make update profile functional
- Make edit roommate preferences function
- Make profile page look better (roommate preferences section)
- Make it so that when you click message now it connects the message to the each users database - What carter was saying earlier
- Make settings page (delete a user, submit help form, FAQ page, change password, reviews and rating, change email)
- Message now should open text convo, and not interested should delete user from interests
- Email notification system when they get a message
- Swiping functionality on matches page (like tinder)
- Profile verification (allow users to verify profile through social media or something)
- Implement search filter feature to find roommates that are more within the criteria they are looking for (budget, location, lifestyle)
- Is it possible to see if there's
*/

function YourProfile(){
    
    const [fullName, setFullName] = useState("");
    const [collegeName, setCollegeName] = useState("");
    const [age, setAge] = useState("");
    const [bedtime, setBedtime] =useState("");
    const [smoke, setSmoke] =useState("");
    const [drink, setDrink] =useState("");
    const [etcAllergy, setEtcAlg] =useState("");
    const [pets, setPet] =useState("");
    const [bio, setBio] =useState("");
    const [numberRoommates, setNumberRoommates] =useState("");
    const [studyHours, setStudyHours] =useState("");
    const [wakeup, setWakeup] =useState("");
    const [workAmount, setWorkAmount] =useState("");
    const [schoolYear, setSchoolYear] =useState("");
    const [cleanness, setCleanness]= useState(0);
    const [closeness, setCloseness]= useState(0);
    const [extroverted, setExtroveted]= useState(0);
    const [profileImage, setProfileImage] = useState("");
    // Initialize Firestore

    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userId = user.uid;

                const userRef = doc(firestore, "users", userId);
                getDoc(userRef)
                    .then((docSnapshot) => {
                        if (docSnapshot.exists()) {
                            const userData = docSnapshot.data();
                            setProfileImage(userData.profileImage);
                        }
                    })
                    .catch((error) => {
                        console.error("Error getting user data:", error);
                    });

                const surveysCollection = collection(firestore, "surveys");
                const q = query(surveysCollection, where('uid', '==', userId));

                getDocs(q)
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            const surveyData = doc.data().surveyData;
                            setFullName(surveyData.fullName)
                            setCollegeName(surveyData.collegeName)
                            setFullName(surveyData.fullName)
                            setCollegeName(surveyData.collegeName)
                            setSchoolYear(surveyData.Year)
                            setAge(surveyData.age)
                            setDrink(surveyData.age)
                            setBedtime(surveyData.bedtime)
                            setSmoke(surveyData.smoke)
                            setEtcAlg(surveyData.etcAllergy)
                            setPet(surveyData.pets)
                            setStudyHours(surveyData.studyHours)
                            setBio(surveyData.bio)
                            setSchoolYear(surveyData.year)
                            setNumberRoommates(surveyData["number-of-roommates"])
                            setCleanness(surveyData.qualities.cleanness)
                            setCloseness(surveyData.qualities.closeness)
                            setExtroveted(surveyData.qualities.extroverted)
                            setWakeup(surveyData.wakeUpTime)
                            setWorkAmount(surveyData["work-amount"])
                        });
                    })
                    .catch((error) => {
                        console.error("Error getting survey data:", error);
                    });
            } else {
                console.log('User is signed out');
            }
        });

        return () => unsubscribe();
    }, [auth]);
    
    
    return(
        // upload and delete image function
        // connect to survey and show results, as well as allow editing of survey answers
        <div className = "yourProfile">
            <Navbar/>

                <Grid container spacing={2}>
                    <Grid item xs={2}>

                        <Sidebar/>

                    </Grid>
                    <Grid item xs={8}
                          alignItems="center" >
            <div className='flex-container'>


                <div className= 'flex-survey'>
                    <img sx={{paddingTop:'-5px'}}
                         src={profileImage || require("../pictures/imagePlaceholder.jpg")}
                         alt="FindMyRoomie"
                         id="output"
                         className="logo1"/>
                    <div id="profile-picture-container">

                    </div>
                    {/* <input id="imageUpload" type="file"
                           name="profile_photo" placeholder="Photo" required="" capture></input>
                    <input type="file" accept="image/*" onChange={loadFile}/> */}


                    <p>
                        {fullName}
                    </p>
                    {/* <p>
                        padberga@g.cofc.edu
                    </p> */}
                     <p>
                        School Year: <b> {schoolYear} </b>
                    </p>
                    <p>
                        {collegeName}
                    </p>
                    <p>
                        ----Bio----
                    </p>
                    <p>
                    {bio}
                    </p>
                    <button>
                        update profile
                    </button>
                </div>

                <div className='flex-survey'>
                    <p>
                        Age: <b>{age} </b>
                    </p>
                    <p>
                        Study Hours: <b>{studyHours} hours</b>
                    </p>
                    <p>
                        Smoke: <b>{smoke}</b>
                    </p>
                    <p>
                        Drink: <b>{drink}</b>
                    </p>
                    <p>
                        Listed Allergies: <b>{etcAllergy}</b>
                    </p>
                    <p>
                        Pet: <b>{pets}</b>
                    </p>
                    <p>
                        Typically go to sleep at: <b>{bedtime} PM</b>
                    </p>
                    <p>
                        Typically Wake up at: <b>{wakeup} AM</b>
                    </p>
                    <p>
                        Extroverted? <b> {extroverted} </b>
                    </p>
                    <p>
                        Friendship with roommates? <b> {closeness} </b>
                    </p>
                    <p>
                        are you clean? <b> {cleanness} </b>
                    </p>
                    <p>
                        work week hours: <b>{workAmount} </b>
                    </p>
                    <p>
                        Number of roommates: <b>{numberRoommates}</b>
                    </p>
                    <button>
                        edit roommate preferences
                    </button>
                </div>



            </div>
                    </Grid>
                </Grid>
        </div>

    )
}
export default YourProfile;
