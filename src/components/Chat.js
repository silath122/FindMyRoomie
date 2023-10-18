import React from "react";
import "../styling/DirectMessage.css"
import Messages from "./Messages"
import Input from "./Input"
import {ChatContext} from "../context/ChatContext";
import {useContext} from "react";
const Chat = () =>{
    const {data} = useContext(ChatContext);
    return(
        <div className="chat">
            <div className="chatInfo">Adam
                {/* <span>{data.user?.name}</span> */}
            </div>
            <Messages/>
            <Input/>
        </div>
        
    )
}
export default Chat