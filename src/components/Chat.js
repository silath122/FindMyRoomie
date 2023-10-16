import React from "react";
import "../styling/DirectMessage.css"
import Messages from "./Messages"
import Input from "./Input"
const Chat = () =>{
    return(
        <div className="chat">
            <div className="chatInfo">
                <span>Alexa</span>
            </div>
            <Messages/>
            <Input/>
        </div>
        
    )
}
export default Chat