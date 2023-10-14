import React from "react";
import "../styling/DirectMessage.css";
import {useState} from "react";
import {collection, query, where, getDocs} from "firebase/firestore";
import {firestore} from "../firebase";

const Search = () =>{
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(null);
    
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
            {user && <div className="userChat">
                <img src={user.photoURL} 
                alt="CW"/>
                <div className="userChatInfo">
                    <span>{user.name}</span>
                </div>
            </div>}
        </div>
        
    );
};
export default Search;