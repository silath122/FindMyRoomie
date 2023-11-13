import React from 'react'
import Message from "./Message"
import {ChatContext} from  "../context/ChatContext"
import {useState, useContext, useEffect, useRef} from "react";
import {collection, query, where, getDocs, serverTimestamp, doc, setDoc, updateDoc, onSnapshot} from "firebase/firestore";
import {firestore} from "../firebase";
const Messages = () => {
  const [messages,setMessages] = useState([])
  const {data} = useContext(ChatContext);
  const messagesDivRef = useRef(null);
  const scrollToBottom = () => {
    if (messagesDivRef.current) {
      messagesDivRef.current.scrollTop = messagesDivRef.current.scrollHeight;
    }
  };
  useEffect(()=>{
    console.log(data)
    const unSub = onSnapshot(doc(firestore, "chats", data.chatId), (doc)=>{
      doc.exists() && setMessages(doc.data().messages)
      scrollToBottom();
    })

    return()=>{
      unSub()
    }
  }, [data.chatId])
  console.log(data.chatId)
  console.log(messages)
  if(messages == null){
    return(
      <div></div>
    )
  }
  return (
      <div className="messages" ref={messagesDivRef}>
        {messages.map(m=>{
          return <Message message={m} key={m.id}/>
      })}
      </div>
      

  )
}
export default Messages;
