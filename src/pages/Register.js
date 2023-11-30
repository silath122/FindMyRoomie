import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import SurveyForm from "./SurveyForm";
import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
    firestore,
    storage,
} from "../firebase";
import "../styling/Register.css";
import Typography from "@mui/material/Typography";
import placeholderImage from "C:/Users/silat/OneDrive/CSCI 362/find-my-roomie/src/pictures/imagePlaceholder.jpg"

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const register = () => {
        if (!name || !profileImage) {
            alert("Please enter name and upload a profile image");
            return;
        }
        registerWithEmailAndPassword(name, email, password, profileImage);
        navigate ("/survey");
    };

    const handleImageUpload = (image1) => {
        const file = image1.target.files[0];
        if (file) {
            // preview image when uploaded
            const reader = new FileReader();
            reader.onload = (image1) => {
                setProfileImage(file);
    
                // Display the image preview
                document.getElementById("imagePreview").src = image1.target.result;
    
            };
            reader.readAsDataURL(file);
        }
    };
    

    useEffect(() => {
        if (loading) return;
        // Check the user's survey status in Firestore
        const checkSurveyStatus = async () => {
            const userRef = firestore.collection("users").doc(user.uid);
            const userData = await userRef.get();

            if (userData.exists) {
                const surveyFilled = userData.data().surveyFilled;
                if (surveyFilled) {
                    navigate("/survey");
                }
            }
        };

        if (user) {
            checkSurveyStatus();
        }
    }, [user, loading, navigate]);

    return (
        <div className = "register">
        <div className="register__container">
            <div className="circular_image_frame">
                <img
                    id="imagePreview"
                    src={profileImage ? URL.createObjectURL(profileImage) : placeholderImage}
                    alt="Profile Preview"
                    className="circular_image"
                />
            </div>
            <div className="text1">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
            </div>
            <Typography color= 'white' fontSize='20px' sx ={{paddingBottom:'10px'}}>
                Register for FindMyRoomie
            </Typography>
            
            <div className="text1">
                <input
                    type="text"
                    className="register__textBox"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                />
            </div>
            <div className="text1">
                <input
                    type="text"
                    className="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />

                <input
                    type="password"
                    className="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
            </div>
                <button
                    className="register__btn"
                    onClick={register}>
                    Register
                </button>
                <button
                    className="register__btn register__google"
                    onClick={signInWithGoogle}>
                    <Typography style={{color:'black'}}> Register with Google </Typography>
                </button>

                <div>
                    <Typography color="white" sx={{marginBottom: '10px'}}>
                    Already have an account?
                    </Typography><Link to="/" className="login__tab">Login now</Link>
                </div>

            </div>
        </div>
    );
}

export default Register;

