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
  if(Math.random()<0.5){
    return(
    <div className="message owner">
        <div className='messageInfo'>
          <img
            src="https://images.pexels.com/photos/18309072/pexels-photo-18309072/free-photo-of-close-up-of-a-couple-holding-hands.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt="" />
          <span>just now</span>
        </div>
        <div className="messageContent">
          <p>test!</p>
        </div>
    </div>
    )
  }else{
    return (
      <div className="message">
          <div className='messageInfo'>
            <img
              src="https://images.pexels.com/photos/18309072/pexels-photo-18309072/free-photo-of-close-up-of-a-couple-holding-hands.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
              alt="" />
            <span>just now</span>
          </div>
          <div className="messageContent">
            <p>what's up</p>
            <img src="https://images.pexels.com/photos/18309072/pexels-photo-18309072/free-photo-of-close-up-of-a-couple-holding-hands.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load" alt="" />
          </div>
        {/* <div
        ref={ref}
        className={`message ${message.senderId === currentUser.uid && "owner"}`}
      >
        <div className="messageInfo">
          <img
            src={message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL}
            alt="" />
          <span>just now</span>
        </div>
        <div className="messageContent">
          <p>{message.text}</p>
          {message.img && <img src={message.img} alt="" />}
        </div>
      </div> */}
      </div>
  
    )
  }
}
export default Message;
