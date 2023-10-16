import React from "react";
import "../styling/DirectMessage.css"
const Search = () =>{
    return(
        <div className="search">
            <div className="searchForm">
                <input type= "text" placeholder='find a conversation'/>
            </div>
            <div className="userChat">
                <img src="https://images.pexels.com/photos/18713194/pexels-photo-18713194/free-photo-of-sea-city-water-street.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="Profile Picture"/>
                <div className="userChatInfo">
                    <span>Alexa</span>
                </div>
            </div>
        </div>
        
    )
}
export default Search