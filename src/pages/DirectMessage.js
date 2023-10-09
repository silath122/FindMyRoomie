import React from "react";
import Navbar from "../components/Navbar"
import Chat from "../components/Chat"
import MessageNav from "../components/MessageNav";
import "../styling/DirectMessage.css";
function DirectMessage(){
    return(
        <div className = "DirectMessagePage">
            <Navbar/>
            <div className="pageContainer">
                <div className = "container">
                    <MessageNav/>
                    <Chat/>
                </div>
            </div>
        </div>
    )
}
export default DirectMessage;