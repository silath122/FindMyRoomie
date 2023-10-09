import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import DirectMessage from "./pages/DirectMessage";
import NoPage from "./pages/NoPage"
import Settings from "./pages/Settings"
function App() {
    //new comment
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/reset" element={<Reset />} />
                    <Route exact path="/dashboard" element={<Dashboard />} />
                    <Route exact path="/home" element={<Home />}/>
                    <Route exact path="/profile" element={<Profile />} />
                    <Route exact path="/messages" element={<DirectMessage />} />
                    <Route exact path="/settings" element={<Settings/>} />
                    <Route path="*" element={<NoPage/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;