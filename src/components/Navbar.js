import "../styling/Navbar.css";
//
export default function Navbar(){
    return (
    
            <nav className="nav">
                <a href="/Home" className="logo"><img src={require("../pictures/FindMyRoomieLogo.png")} alt="FindMyRoomie" />FindMyRoomieLogo</a>
                <ul>
                    <li>
                        <a href="/messages">Messages</a>
                    </li>
                    <li>
                        <a href="/dashboard">Dashboard</a>
                    </li>
                </ul>

            </nav>
        
    )
}