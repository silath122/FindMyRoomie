import "../styling/Profile.css"
import React, {useState} from "react";
import Navbar from "../components/Navbar";
import Grid from "@mui/material/Grid";
import Sidebar from "../Sidebar";
import {collection, getDocs, query, where} from "firebase/firestore";
import {firestore} from "../firebase";

function YourProfile(){

    const [age, setAge] = useState("");
    const [bedtime, setBedtime] =useState("");
    const [bio, setBio] =useState("");
    const [numberRoommates, setNumberRoommates] =useState("");
    const [studyHours, setStudyHours] =useState("");
    const [wakeup, setWakeup] =useState("");
    const [workAmount, setWorkAmount] =useState("");
    const [schoolYear, setSchoolYear] =useState("");
    const [cleanness, setCleanness]= useState("");
    const [closeness, setCloseness]= useState("");
    const [extroverted, setExtroveted]= useState("");
    // Initialize Firestore

    const userId = "xSZ6mWKv2Tea17OuzU0hiTlNc5U2";
    // currently hardcoded to Alexas profile, need to figure out how to query
    // user's id


    //TODO: change to use userSurveys collection inside the users collection.
    //was calling the surveys collection to be parsed
    const surveysCollection = collection(firestore, "surveys");
    console.log("survey collection: ", surveysCollection);
    //query to retrieve the current users completed survey
    const q = query(surveysCollection, where('userId', '==', userId));
    //execute query
    getDocs(q)
        .then((querySnapshot) => {
            //loop through specific users answers and look at "survey data" field
            querySnapshot.forEach((doc) => {
                const surveyData = doc.data().surveyData;

               setAge(surveyData.age)
               setBedtime(surveyData.bedtime)
               setStudyHours(surveyData.studyHours)
               setBio(surveyData.bio);
               setSchoolYear(surveyData.year);
               setNumberRoommates(surveyData["number-of-roommates"]);

               setWakeup(surveyData.wakeUpTime)
               setWorkAmount(surveyData["work-amount"])
            });
        })
        .catch((error) => {
            console.error("Error getting survey data:", error);
        });

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


                <div class = 'flex-user'>
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
                        Alexa Padberg
                    </p>
                    <p>
                        padberga@g.cofc.edu
                    </p>
                     <p>
                         {schoolYear} Year
                    </p>
                    <p>
                        College of Charleston
                    </p>
                    {/*<p>*/}
                    {/*    Bio: {bio}*/}
                    {/*</p>*/}
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
                        Extroverted? <b> Agree </b>
                    </p>
                    <p>
                        Friendship with roommates? <b> Neutral</b>
                    </p>
                    <p>
                        are you clean? <b> Strongly Agree</b>
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



            </div>
                    </Grid>
                </Grid>
        </div>

    )
}
export default YourProfile;