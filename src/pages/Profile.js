import "../styling/Profile.css"
import React, {useState} from "react";
import Navbar from "../components/Navbar";
import Grid from "@mui/material/Grid";
import Sidebar from "../Sidebar";
import {collection, getDocs, query, where} from "firebase/firestore";
import {firestore} from "../firebase";
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
    // Initialize Firestore

    // user id
    const auth = getAuth();
    
    // check if user is authenticated and logged in before query
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userId = user.uid;

            const surveysCollection = collection(firestore, "surveys");
            console.log("survey collection: ", surveysCollection);
            // Now you can user userId to query the user's survey data
            const q = query(surveysCollection, where('uid', '==', userId));

            // execute query
            getDocs(q)
                .then((querySnapshot) => {
                //loop through specific users answers and look at "survey data" field
                    querySnapshot.forEach((doc) => {
                        const surveyData = doc.data().surveyData;
                        setFullName(surveyData.fullName)
                        setCollegeName(surveyData.collegeName)
                        setFullName(surveyData.fullName)
                        setCollegeName(surveyData.collegeName)
                        setSchoolYear(surveyData.Year)
                        setAge(surveyData.age)
                        setBedtime(surveyData.bedtime)
                        setSmoke(surveyData.smoke);
                        setDrink(surveyData.drink);
                        setEtcAlg(surveyData.etcAllergy);
                        setPet(surveyData.pets);
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
    
    //TODO: change to use userSurveys collection inside the users collection.
    //was calling the surveys collection to be parsed

    function uploadProfilePicture() {
        const fileInput = document.getElementById('imageUpload');
        const preview = document.getElementById('preview');
        const profileImage = document.getElementById('profileImage');

        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const img = new Image();
                img.src = e.target.result;

                img.onload = function () {
                    // Display the uploaded image in the preview div
                    preview.innerHTML = '';
                    preview.appendChild(img);

                    // Update the profile image
                    profileImage.src = e.target.result;
                };
            };

            reader.readAsDataURL(file);
        }
    }
    function loadFile(event) {
        const output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function() {
            URL.revokeObjectURL(output.src) // free memory
        }
    };

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
                    <img sx={{paddingTop:'-5px'}}
                         src={require("../pictures/imagePlaceholder.jpg")}
                         alt="FindMyRoomie"
                         id="output"
                         className="logo"/>
                    <div id="profile-picture-container">

                    </div>
                    <input id="imageUpload" type="file"
                           name="profile_photo" placeholder="Photo" required="" capture></input>
                    <input type="file" accept="image/*" onChange={loadFile}/>


                    <p>
                        {fullName}
                    </p>
                    {/* <p>
                        padberga@g.cofc.edu
                    </p> */}
                     <p>
                         <b> schoolYear: {schoolYear} </b>
                    </p>
                    <p>
                        {collegeName}
                    </p>
                    <p>
                        Bio: {bio}
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
