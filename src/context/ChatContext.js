import { createContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {useContext} from "react";
import {AuthContext} from "./AuthContext"

export const ChatContext = createContext();


export const ChatContextProvider = ({ children }) => {
  const {currentUser} = useContext(AuthContext)
  const INITIAL_STATE = {
    chatId: "null",
    user:{}
  }
  const chatReducer = (state, action) =>{
    var otherUID = (action.payload.uid) 
    switch(action.type){
      
        case"CHANGE_USER":
            return{
                user: action.payload,
                chatId: currentUser.uid > otherUID ? currentUser.uid + otherUID : otherUID + currentUser.uid
            }
            default:
      
    }
  }
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)
  return (
    <ChatContext.Provider value={{ data: state, dispatch}}>
      {children}
    </ChatContext.Provider>
  );
};