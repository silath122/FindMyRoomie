import React from "react";
import Search from "./Search";
import Chats from "./Chats"
import Chat from "./Chat"
import "../styling/DirectMessage.css"
const MessageNav = () => {
    return(
        <div className="messageNav">
            <Search/>
            <Chats/>
        </div>
        
    )
}
export default MessageNav