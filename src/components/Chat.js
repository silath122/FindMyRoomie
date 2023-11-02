import React from "react";
import "../styling/DirectMessage.css"
import Messages from "./Messages"
import Input from "./Input"
import {ChatContext} from "../context/ChatContext";
import {useContext} from "react";
const Chat = () =>{
    const {data} = useContext(ChatContext);
    console.log(data)
    return(
        <div className="chat">
            <div className="chatInfo">
                <span>{JSON.parse(data.user?.displayName)}</span>
            </div>
            <Messages/>
            <Input/>
        </div>
        
    )
}
export default Chat