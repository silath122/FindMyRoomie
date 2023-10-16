import "../styling/Navbar.css";
import {Link } from "react-router-dom";
import {logout} from "../firebase"
export default function Navbar(){
    return (
    
            <nav className="nav">
                <a href= "/home"><img src={require("../pictures/FindMyRoomieLogo.png")} alt="FindMyRoomie" class="logo"/></a>
                <ul>
                    <button onClick={()=>logout()}>Logout</button>
                    <Link to="/settings"><button>
                        Settings
                    </button></Link>
            
                </ul>

            </nav>
        
    )
}