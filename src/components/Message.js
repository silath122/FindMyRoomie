import React from 'react'
import "../styling/DirectMessage.css"
import {ChatContext} from "../context/ChatContext";
import {AuthContext} from "../context/AuthContext";
import {useContext, useRef, useEffect} from "react";
const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)
   
  const ref = useRef();


  useEffect(()=>{
    ref.current?.scrollIntoView({behavior: "smooth"});
  },[message]);

  console.log(message)
  //randomly picks whether message will be owner or other person for showcase purposes
  
  return (
    
       <div
      ref={ref}
      className={`message ${message.senderID === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={message.senderID === currentUser.uid
            ? currentUser.photoURL
            : data.user.photoURL}
          alt="" />
      </div>
      <div className="messageContent">
        <p>{message.content}</p>
        {message.attachment && <img src={message.attachment} alt="" />}
      </div>
    </div> 

  )
}


export default Message;
