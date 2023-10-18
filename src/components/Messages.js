import React from 'react'
import Message from "./Message"
import {ChatContext} from  "../context/ChatContext"
import {useState, useContext, useEffect} from "react";
import {collection, query, where, getDocs, serverTimestamp, doc, setDoc, updateDoc, onSnapshot} from "firebase/firestore";
import {firestore} from "../firebase";
const Messages = () => {
  const [messages,setMessages] = useState([])
  const {data} = useContext(ChatContext);

  useEffect(()=>{
    const unSub = onSnapshot(doc(firestore, "chats", data.chatId), (doc)=>{
      doc.exists() && setMessages(doc.data().messages)
    })

    return()=>{
      unSub()
    }
  })
  return (
      <div className="messages">
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
      </div>
      
    // <div className="messages">
    //   {messages.map(m=>{
    //     <Message message={m} key={m.id}/>
    //   })}
        
    // </div>
  )
}
export default Messages;
