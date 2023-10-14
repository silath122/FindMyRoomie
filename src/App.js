import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import DirectMessage from "./pages/DirectMessage";
import NoPage from "./pages/NoPage"
import Settings from "./pages/Settings";
import FrontPage from "./pages/FrontPage";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";
function App() {
    //new comment
    const {currentUser} = useContext(AuthContext);

    console.log(currentUser);

    const ProtectedRoute = ({children}) =>{
        if(!currentUser){
            return <Navigate to="/login"/>;
        }
        return children;
    };

    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route exact path= "/" element={<FrontPage/>}/>
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/reset" element={<Reset />} />
                    <Route exact path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route exact path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
                    <Route exact path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route exact path="/messages" element={<ProtectedRoute><DirectMessage /></ProtectedRoute>} />
                    <Route exact path="/settings" element={<ProtectedRoute><Settings/></ProtectedRoute>} />
                    <Route path="*" element={<NoPage/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;