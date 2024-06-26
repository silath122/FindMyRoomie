import React from 'react'
import "../styling/DirectMessage.css"
import Attach from "../pictures/attach.png"
import {v4 as uuid} from "uuid";
import {useState, useContext, Timestamp} from "react";
import {AuthContext} from "../context/AuthContext";
import {ChatContext} from "../context/ChatContext";
import {collection, query, where, getDocs, serverTimestamp, doc, setDoc, updateDoc, arrayUnion} from "firebase/firestore"; 
import {firestore, storage} from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("")
  const [img, setImg] = useState(null)
  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const handleSend = async ()=>{
    console.log(data.chatId)
    if(img){
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            
            await updateDoc(doc(firestore, "chats", data.chatId), {
              messages: arrayUnion({
                attachment: img,
                content: text,
                senderID: currentUser.uid,
                
              }),
            });
          });
        }
      );
    }else{
      await updateDoc(doc(firestore,"chats",data.chatId),{
        messages: arrayUnion({
          attachment: img,
          content: text,
          senderID: currentUser.uid,
        })
      })
    }
    await updateDoc(doc(firestore, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(firestore, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
    
  }
  return (
    <div className="input">
        <input type="text" 
        placeholder="Type here!" 
        onChange={e=>setText(e.target.value)}/>
        <div className="send">
            
            <button onClick={handleSend}>Send</button>
        </div>
    </div>
  )
}

export default Input