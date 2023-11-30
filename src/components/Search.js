import React from "react";
import { useContext } from "react";
import "../styling/DirectMessage.css";
import {useState} from "react";
import {collection, query, where, getDocs, serverTimestamp, doc, setDoc, updateDoc, getDoc} from "firebase/firestore";
import {firestore} from "../firebase";
import {AuthContext} from "../context/AuthContext";
const Search = () =>{
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(null);
    
    const {currentUser} = useContext(AuthContext)

    const handleSearch = async () => {
        const q = query(collection(firestore, "users"), where("name","==", username));
        try{
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        }catch(err){
            setErr(true);
        }
    };
    



    const handleKey = (e) =>{
        e.code === "Enter" && handleSearch();
    };

    const handleSelect = async() =>{
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try{
            const res = await getDoc(doc(firestore, "chats", combinedId));
            if(!res.exists()){
                await setDoc(doc(firestore,"chats",combinedId), {messages: [] });
                console.log(res)
                let doc = getDoc(firestore, "userChats", currentUser.uid);
                const test = {
                    id: currentUser.uid,
                    date: serverTimestamp(),
                    lastMessage: {
                        text: ""
                    },
                    userInfo: {
                        displayName: user.uid,
                        photoURL: "",
                        uid: user.uid
                    }
                }
                doc.push(test)
                
                //Do same for other user if above works
            }

            
        } catch(err){
            setUser(null);
            setUsername("")
        }
        
    };
  
    return(
        <div className="search">
            <div className="searchForm">
                <input type= "text" 
                placeholder='Find a conversation' 
                onKeyDown={handleKey} 
                onChange={(e)=>setUsername(e.target.value)}
                value={username}
                />
            </div>
            {err && <span>User not found.</span>}
            {user && (
            <div className="userChat" onClick={handleSelect}>
                <img src={user.photoURL} 
                alt=""/>
                <div className="userChatInfo">
                    <span>{user.name}</span>
                </div>
            </div>)}
        </div>
        
    );
};
export default Search;