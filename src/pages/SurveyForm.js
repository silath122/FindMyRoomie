import React, {useCallback, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {app, auth, storeSurveyResults} from "../firebase"
import {getFirestore, doc, getDoc} from "firebase/firestore";
import "survey-core/defaultV2.min.css";
import { Model, StylesManager } from "survey-core";
import { Survey } from "survey-react-ui";
import '../styling/SurveyForm.css'
import "survey-core/survey.css";
import Navbar from "../components/Navbar"
import Typography from "@mui/material/Typography";
import Loading from "../pages/LoadingPage";



// need this for handlesurvey method
const firestore = getFirestore(app);

const surveyJson = {
    elements: [
        {
            name: "fullName",
            title: "Enter your first and last name:",
            type: "text",
            isRequired: "true",

        },
        {
            name: "age",
            title: "Enter your age:",
            type: "text",
            isRequired: "true",
        },
        {
            name: "collegeName",
            title: "What college do you attend?",
            type: "text",
            isRequired: "true",

        },
        {
            name: "bio",
            title: "Tell us about yourself",
            type: "text",
            isRequired: "true",
        },
        {
            name: "year",
            title: "What school year are you",
            type: "dropdown",
            isRequired: "true",
            "choices": [{
                "value": "freshman",
                "text": "Freshman"
            }, {
                "value": "sophmore",
                "text": "Sophomore"
            }, {
                "value": "junior",
                "text": "Junior"
            }, {
                "value": "senior",
                "text": "Senior"
            }]
        },
        {
            name: "smoke",
            title: "Do You Smoke/vape?",
            type: "dropdown",
            isRequired: "true",
            "choices": [{
                            "value": "yes",
                            "text": "Yes"
                        }, {
                            "value": "no",
                            "text": "No"
                        }]
        },
        {
            name: "drink",
            title: "How often do you drink?",
            type: "dropdown",
            isRequired: "true",
            "choices": [{
                            "value": "never",
                            "text": "Never"
                        },
                        {
                            "value": "Socially",
                            "text": "Socially"
                        },
                        {
                            "value": "once or twice a week",
                            "text": "Once or twice twice a week"
                        },
                        {
                            "value": "More than twice a week",
                            "text": "More than twice a week"
                        }]
        },
         {
             name: "etcAllergy",
             title: "If you have any allergies, please detail them below. If you have none, then please type none.",
             type: "text",
             isRequired: "True",
         },
         {
            name: "pets",
            title: "Are you okay with pets?",
            type: "dropdown",
            isRequired: "true",
            "choices": [{
                            "value": "yes",
                            "text": "Yes"
                        }, {
                            "value": "no",
                            "text": "No"
                        }]
        },
        {
            name: "studyHours",
            studyHours: "year",
            title: "How much do you like to study daily?",
            type: "dropdown",
            isRequired: "true",
            "choices": [{
                "value": "0-1",
                "text": "0-1 hours"
            }, {
                "value": "2-3 hours",
                "text": "2-3 hours"
            }, {
                "value": "3-4 hours",
                "text": "3-4 hours"
            }, {
                "value": "4+",
                "text": "4+ hours"
            }]
        },
        {
            name: "bedtime",
            title: "What time do you typically go to sleep?",
            type: "dropdown",
            isRequired: "true",
            "choices": [{
                "value": "before 10",
                "text": "before 10"
            }, {
                "value": "10-11",
                "text": "10-11 pm"
            }, {
                "value": "midgnight",
                "text": "midnight"
            }, {
                "value": "after midnight",
                "text": "after midnight"
            }]
        },
        {
            name: "wakeUpTime",
            title: "What time do you typically wake up?",
            type: "dropdown",
            isRequired: "true",
            "choices": [{
                "value": "before 6",
                "text": "before 6"
            }, {
                "value": "7-8",
                "text": "7-8 am"
            }, {
                "value": "9-10",
                "text": "9-10 am"
            }, {
                "value": "11 or later",
                "text": "11 or later"
            }]
        },
        {
            "type": "matrix",
            "name": "qualities",
            "title": "Please indicate if you agree or disagree with the following statements",
            "isRequired": true,
            "columns": [{
                "value": 5,
                "text": "Strongly agree"
            }, {
                "value": 4,
                "text": "Agree"
            }, {
                "value": 3,
                "text": "Neutral"
            }, {
                "value": 2,
                "text": "Disagree"
            }, {
                "value": 1,
                "text": "Strongly disagree"
            }],
            "rows": [{
                "value": "extroverted",
                "text": "I am extroverted"
            }, {
                "value": "closeness",
                "text": "I want to be close with my roommate(s)"
            }, {
                "value": "cleanness",
                "text": "I am clean"
            }]
        },
        {
            name: "work-amount",
            title: "How much do you work a week?",
            type: "dropdown",
            isRequired: "true",
            "choices": [{
                "value": "dont",
                "text": "I don't work"
            }, {
                "value": "5-10",
                "text": "5-10 hours"
            }, {
                "value": "11-20",
                "text": "11-20 hours"
            }, {
                "value": "21-30",
                "text": "21-30 hours"
            }, {
                "value": "full time",
                "text": "full time"
            }]
        },
        {
            name: "number-of-roommates",
            title: "How many roommates would you like to live with?",
            type: "dropdown",
            isRequired: "true",
            "choices": [{
                "value": "1",
                "text": "1"
            }, {
                "value": "2",
                "text": "2"
            }, {
                "value": "3",
                "text": "3"
            }, {
                "value": "4 or more",
                "text": "4 or more"
            }]
        },
        {
            name: "submit",
            title: "Submit",
            type: "button",
            cssClass: "custom-submit-button", // Add this class
        }
    ]
};

function SurveyForm() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        grade: '',
        major: '',
        bio: '',
        smoke: '',
        drink: '',
        etcAllergy:'',
        pets: '',
        cleanliness: 0,
        friendliness: 0,
        studyAmount: 0,
        bedtime: 0,
        wakeup: 0,
        workhours: 0,
        closeness: 0,
        roommateamount: 0,
    });
    const [formComplete, setFormComplete] = useState(false);
    const navigate = useNavigate();
    

    const survey = new Model(surveyJson);
    survey.focusFirstQuestionAutomatic = false;

    const handleSurveyComplete = async () => {
        const surveyData = survey.data;
        setFormData(surveyData); 
        setFormComplete(true); // it sets the form to true before it even runs.. try putting in try section - Fix later (Siah)

        // get the uid
        const user = auth.currentUser;
        if (user) {
            try {
                const userId = user.uid;

                storeSurveyResults(userId, surveyData);
                navigate('/Loading');
                
            }
            catch (error) {
                console.error('Error saving survey:', error);
                alert('Failed to save survey data: ', + error.message);
            }
        }
        else {
            // user isn't authenticated
            console.error('User is not authenticated.');
        }

    };

    return (
        <div style={{ backgroundColor: '#f0f0f0' }}>
            <Navbar/>
            <Typography variant="h6" align='center' sx={{display:'flex-start', paddingTop:'10px', paddingLeft: '10px' }}>Please complete the survey before continuing:</Typography>
            <Survey model={survey} onComplete={handleSurveyComplete} />
        </div>
    );
}

export default SurveyForm;
