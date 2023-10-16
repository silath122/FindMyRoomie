import React, {useCallback, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import '../styling/SurveyForm.css'
import Navbar from "../components/Navbar"
const surveyJson = {
    elements: [
        {
            name: "FirstName",
            title: "Enter your first and last name:",
            type: "text"
        },
        {
            age: "age",
            title: "Enter your age:",
            type: "text"
        },
        {
            bio: "bio",
            title: "Tell us about yourself",
            type: "text"
        },
        {
            year: "year",
            title: "What school year are you",
            type: "dropdown",
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
            studyHours: "year",
            title: "How much do you like to study daily?",
            type: "dropdown",
            "choices": [{
                "value": "0-1",
                "text": "0-1 hours"
            }, {
                "value": "2 hours",
                "text": "2 hours"
            }, {
                "value": "3 hours",
                "text": "3 hours"
            }, {
                "value": "4+",
                "text": "4+ hours"
            }]
        },
        {
            sleep: "sleep",
            title: "What time do you typically go to sleep?",
            type: "dropdown",
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
            wakeUp: "wakeUp",
            title: "What time do you typically wake up?",
            type: "dropdown",
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
            workAmount: "work-amount",
            title: "How much do you work a week?",
            type: "dropdown",
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
                "value": "20-30",
                "text": "20-30 hours"
            }, {
                "value": "full time",
                "text": "full time"
            }]
        },
        {
            numberRoommates: "number-of-roommates",
            title: "How many roommates would you like to live with?",
            type: "dropdown",
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

    const alertResults = useCallback((sender) => {
        const results = JSON.stringify(sender.data);
        alert(results);
    }, []);

    survey.onComplete.add(alertResults);


    return (

            <div style={{ backgroundColor: '#f0f0f0' }}>
                <Navbar/>
                <div>Please complete the survey before continuing</div>
                <Survey model={survey} />
            </div>

    );
}


export default SurveyForm;
