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
                await updateDoc(doc(firestore, "userChats", currentUser.uid),{
                    [combinedId+".userInfo"]:{
                        uid: user.uid,
                        name: user.name,
                        photoURL: user.photoURL
                    },
                    [combinedId+".date"]: serverTimestamp()
                });
                await updateDoc(doc(firestore, "userChats", user.uid),{
                    [combinedId+".userInfo"]:{
                        uid:currentUser.uid,
                        name: currentUser.name,
                        photoURL: currentUser.photoURL
                    },
                    [combinedId+".date"]: serverTimestamp(),
                });
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