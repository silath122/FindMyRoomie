import "../styling/Profile.css"
import React, {useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import Grid from "@mui/material/Grid";
import Sidebar from "../Sidebar";
import {collection, getDocs, query, where} from "firebase/firestore";
import {auth, firestore} from "../firebase";
function YourProfile(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [bedtime, setBedtime] =useState("");
    const [bio, setBio] =useState("");
    const [numberRoommates, setNumberRoommates] =useState("");
    const [studyHours, setStudyHours] =useState("");
    const [wakeup, setWakeup] =useState("");
    const [workAmount, setWorkAmount] =useState("");
    const [schoolYear, setSchoolYear] =useState("");
    const [cleanness, setCleanness]= useState(0);
    const [closeness, setCloseness]= useState(0);
    const [extroverted, setExtroveted]= useState(0);
    const [isLoading, setIsLoading] = useState(true); // profile loading state

    //Put Alexa's code here
    
    //Siah's code below
    /**
     * 10/31/23 Something is wrong with the database.
     * The users are not linked with the ids of the surveys, so every time the user logs in
     * they have to refill out the survey
     * Fix the database, link, and organize everything in order to continue on with this code. 
     */
    useEffect(() => {
        // get the current user
        const user = auth.currentUser;

        if (user) {
            // If a user is signed in then then get their UID
            const userId = user.uid;

            // reference to the Firestore collection that contains survey data
            const surveysCollection = collection(firestore, "surveys");
            const usersCollection = collection(firestore, "users");

            // Query to find survey data for the current user
            const surveyq = query(surveysCollection, where('userId', '==', userId));
            const usersq = query(usersCollection, where('userId', '==', userId)) // it's uid not user ID

            getDocs(usersq)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const surveyData = doc.data().surveyData;
                    const usersData = doc.data().users;
                    // set the state as the collected user data
                    setName(usersData.name);
                    setEmail(usersData.email);
                    setBio(surveyData.bio);
                    setIsLoading(false); // Loading the data is complete
                });
              })
              .catch((error) => {
                console.error("Error getting survey data:", error);
                setIsLoading(false); //Loading the data is complete even in case of error
              });

            getDocs(surveyq)
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const surveyData = doc.data().surveyData;
                    const usersData = doc.data().users;
                    // set the state as the collected user data
                    setName(usersData.name);
                    setEmail(usersData.email);
                    setAge(surveyData.age);
                    setBedtime(surveyData.bedtime);
                    setStudyHours(surveyData.studyHours);
                    setBio(surveyData.bio);
                    setSchoolYear(surveyData.year);
                    setNumberRoommates(surveyData["number-of-roommates"]);
                    setCleanness(surveyData.qualities.cleanness);
                    setCloseness(surveyData.qualities.closeness);
                    setExtroveted(surveyData.qualities.extroverted);
                    setWakeup(surveyData.wakeUpTime);
                    setWorkAmount(surveyData["work-amount"]);
                    setIsLoading(false); // Loading the data is complete
                });
              })
              .catch((error) => {
                console.error("Error getting survey data:", error);
                setIsLoading(false); //Loading the data is complete even in case of error
              });
        }
    }, []);



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
                
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                <>

                <div class = 'flex-user'>
                    <img sx={{paddingTop:'-5px'}}
                         src={require("../pictures/imagePlaceholder.jpg")}
                         alt="FindMyRoomie" className="logo"/>
                    <p>
                        {name}
                    </p>
                    <p>
                        {email}
                    </p>
                     <p>
                         {schoolYear} Year
                    </p>

                    {/*need to add a college part in the survey or we need to figure out
                        // how we're going to go about displaying college based off them filling out information when they register8? */}
                    <p>
                        College of Charleston
                    </p>
                    <p>
                        Bio: <b>{bio}</b>
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
                        Study Hours: <b>{studyHours} </b>
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
                        Friendship with roommates? <b> {closeness}</b>
                    </p>
                    <p>
                        are you clean? <b> {cleanness}</b>
                    </p>
                    <p>
                        work week hours: <b>{workAmount}</b>
                    </p>
                    <p>
                        Number of roommates: <b>{numberRoommates}</b>
                    </p>
                    <button>
                        edit roommate preferences
                    </button>
                </div>
                </>
            )}

            </div>
                    </Grid>
                </Grid>
        </div>

    )
}
export default YourProfile;