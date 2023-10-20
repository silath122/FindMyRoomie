// import "../styling/Navbar.css";
// import {Link } from "react-router-dom";
// import {logout} from "../firebase"
// import Button from "react-bootstrap/Button";
// import Typography from "@mui/material/Typography";
// export default function Navbar(){

//     return (
    
//             <nav className="nav">
//                 <a href= "/home">

//                     <img className="logo"
//                          src={require("../pictures/FindMyRoomieLogo.png")}
//                          alt="FindMyRoomie"/>
//                 </a>
//                 <Typography
//                     className="title"
//                     sx={{letterSpacing: '3px', fontSize: '35px', fontWeight: 'bold', fontFamily: "Segoe UI Emoji"}}>
//                     Find My Roomie
//                 </Typography>
//                 <ul>
//                     <button onClick={()=>logout()}>Logout</button>
//                     <Link to="/settings">
//                         <Typography sx={{align: 'center', paddingTop:'5px'}}> Settings</Typography>

//                     </Link>
            
//                 </ul>

//             </nav>
        
//    )
// }

import "../styling/Navbar.css";
import { Link } from "react-router-dom";
import { logout } from "../firebase";
import Button from "react-bootstrap/Button";
import Typography from "@mui/material/Typography";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/home" className="logo-link">
        <img
          className="logo"
          src={require("../pictures/FindMyRoomieLogo.png")}
          alt="FindMyRoomie"
        />
      </Link>
      <Typography
        className="title"
        sx={{
          letterSpacing: "3px",
          fontSize: "35px",
          fontWeight: "bold",
          fontFamily: "Segoe UI Emoji",
        }}
      >
        Find My Roomie
      </Typography>
      <ul>
        <button onClick={() => logout()}>Logout</button>
        <Link to="/settings">
          <Typography sx={{ align: "center", paddingTop: "5px" }}> Settings</Typography>
        </Link>
      </ul>
    </nav>
  );
}
