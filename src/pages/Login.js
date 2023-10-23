import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {auth, firestore, logInWithEmailAndPassword, signInWithGoogle} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../styling/Login.css";
import Typography from "@mui/material/Typography";
import {collection, doc, getDocs, query, where} from "firebase/firestore";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const[completedSurvey, setCompletedSurvey]=useState("");

    useEffect(() => {

        if (user) navigate("/survey");
    }, [user, loading, navigate]);





    return (
        <div className="login">

            <div className="login__container">
                <img
                    src={require("../pictures/FindMyRoomieLogo.png")}
                    alt="FindMyRoomie"
                    className="logo"
                    sx={{ align: 'center', marginLeft: '10px' }}
                />
                <Typography color= 'white' fontSize='20px' sx ={{paddingBottom:'10px'}}>
                    Login to FindMyRoomie
                </Typography>
                <input
                    type="text"
                    className="login__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    type="password"
                    className="login__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button
                    className="login__btn"
                    onClick={() => logInWithEmailAndPassword(email, password)}
                >
                    Login
                </button>
                <button  className="login__btn login__google" onClick={signInWithGoogle}>
                    <Typography style={{color:'black'}}>  Login with Google</Typography>

                </button>
                <div>
                    <Typography color= 'white'  fontSize='15px' sx ={{paddingBottom:'10px'}}>   Don't have an account?</Typography>
                   <Link to="/register" className="register__button">Register now</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;