import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Sidebar from "./Sidebar";

import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import SurveyForm from "./SurveyForm";
import Matches from "./pages/Matches"

function App() {

    return (

        <div className="app">
            <Router>
                        <Routes>
                            <Route path="/" element={<Login/>}/>
                            <Route path ="/survey" element={<SurveyForm/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/reset" element={<Reset/>}/>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                            <Route path="/home" element={<Home/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/matches" element={<Matches/>}/>
                        </Routes>
            </Router>
        </div>
    );
}

export default App;