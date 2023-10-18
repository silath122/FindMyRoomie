import React from "react";
import "../styling/DirectMessage.css"
import { AuthContext } from "../context/AuthContext";
import {useState, useEffect, useContext} from "react";
import {firestore} from "../firebase";
import {onSnapshot, doc} from "firebase/firestore";
import { ChatContext } from "../context/ChatContext";

const Chats = () =>{
    const [chats,setChats] = useState([])
    const {currentUser} = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext);

    useEffect(()=>{
        const getChats = () =>{
            console.log(currentUser.uid)
            const unsub = onSnapshot(doc(firestore,"userChats", currentUser.uid), (doc) =>{
                setChats(doc.data())
            })
    
            return ()=>{
                unsub();
            }
        }
        currentUser.uid && getChats()
    }, [currentUser.uid])

    const handleSelect = (u) =>{
        dispatch({type:"CHANGE_USER", payload:u})
    }


    
        console.log(chats)
        return(
            
            <div className="chats">
                      <div className="userChat">
                        <img src={"https://images.pexels.com/photos/5732892/pexels-photo-5732892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="" />
                        <div className="userChatInfo">
                          <span>Adam</span>
                          <p>hello</p>
                        </div>
                        </div>
                {chats &&
                    Object.entries(chats).map( (chat) => {
                      console.log(chat[1].userInfo.photoURL);
                      return(
                      <div className="userChat" 
                        key={chat[0]}
                        onClick={() => handleSelect(chat[1].userInfo)}
                        >
                        <img src={JSON.parse(chat[1].userInfo.photoURL)} alt="" />
                        <div className="userChatInfo">
                          <span>{JSON.parse(chat[1].userInfo.displayName)}</span>
                          <p>{JSON.parse(chat[1].lastMessage?.text)}</p>
                        </div>
                      </div>
                      )
                            
                         
                        
                      })}
            </div>
    );
}

export default Chats