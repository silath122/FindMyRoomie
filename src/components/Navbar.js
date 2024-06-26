import "../styling/Navbar.css";
import {Link } from "react-router-dom";
import {logout} from "../firebase"
import Button from "react-bootstrap/Button";
import Typography from "@mui/material/Typography";
export default function Navbar(){

    return (
    
            <nav className="nav">
                <a href= "/home"
                   sx = {{paddingTop:'5px'}}>
                    <img sx={{paddingTop:'-5px'}}
                         src={require("../pictures/FindMyRoomieLogo.png")}
                         alt="FindMyRoomie" className="logo"/>
                </a>
                <Typography
                    className="title"
                    sx={{letterSpacing: '3px', fontSize: '35px', fontWeight: 'bold', fontFamily: "Segoe UI Emoji"}}>
                    Find My Roomie
                </Typography>
                <ul>
                    <button className="logout-btn" onClick={()=>logout()}>Logout</button>

                </ul>

            </nav>
        
    )
}