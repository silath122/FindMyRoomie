import "../styling/Navbar.css";
//
export default function Navbar(){
    return (
    
            <nav className="nav">
                {/* Need to include
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/reset" element={<Reset />} />
                    <Route exact path="/dashboard" element={<Dashboard />} />
                    <Route exact path="/home" element={<Home />}/>
                    <Route exact path="/profile" element={<Profile />} />
                    <Route exact path="/messages" element={<DirectMessage />} />
                */}
                <a href= "/home"><img src={require("../pictures/FindMyRoomieLogo.png")} alt="FindMyRoomie" class="logo"/></a>
                <ul>
                    <li>
                        <a href="/messages">Messages</a>
                    </li>
                    <li>
                        <a href="/dashboard">Dashboard</a>
                    </li>
                    <li>
                        <a href="/profile">Profile</a>
                    </li>
            
                </ul>

            </nav>
        
    )
}