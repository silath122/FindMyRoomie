import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../styling/Login.css";
import Typography from "@mui/material/Typography";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await logInWithEmailAndPassword(email, password);
            // Redirect to the home page after a successful login
            if(logInWithEmailAndPassword(email,password)){
                navigate("/home")
            };
        } catch (error) {
            // Handle login error
            console.error("Login failed: ", error);
        }
    }

    useEffect(() => {

    }, [user, loading, navigate]);

    return (
        <div className="login">

            <div className="login__container">
                <div className="login__logo">
                <img
                    src={require("../pictures/FindMyRoomieLogo.png")}
                    alt="FindMyRoomie"
                    className="logo"

                />
                </div>
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
                    <Typography color="white">
                    Don't have an account?
                    </Typography><Link to="/register" className="register__button">Register now</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;