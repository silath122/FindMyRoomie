import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import SurveyForm from "./SurveyForm";
import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
    firestore
} from "../firebase";
import "../styling/Register.css";
import Typography from "@mui/material/Typography";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const register = () => {
        if (!name) alert("Please enter name");
        registerWithEmailAndPassword(name, email, password);
        navigate ("/survey");
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
                    navigate("/dashboard");
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
            <img
                src={require("../pictures/FindMyRoomieLogo.png")}
                alt="FindMyRoomie"
                className="logo"
                sx={{ align: 'center', marginLeft: '10px' }}
            />
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
                    <Typography color="white">
                    Already have an account?
                    </Typography><Link to="/" className="login__tab">Login now</Link>
                </div>

        </div>
        </div>
    );
}

export default Register;