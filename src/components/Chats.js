import React from "react";
import "../styling/DirectMessage.css"

const Chats = () =>{
    return(
        <div className="chats">
            <div className="userChat">
                <img 
                    src="https://images.pexels.com/photos/18713194/pexels-photo-18713194/free-photo-of-sea-city-water-street.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" 
                    alt="Profile Picture"
                    />
                <div className="userChatInfo">
                    <span>Alexa</span>
                    <p>Sample Message</p>
                </div>
            </div>
            <div className="userChat">
                <img src="https://images.pexels.com/photos/18713194/pexels-photo-18713194/free-photo-of-sea-city-water-street.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="Profile Picture"/>
                <div className="userChatInfo">
                    <span>Alexa</span>
                    <p>Sample Message</p>
                </div>
            </div>
            <div className="userChat">
                <img src="https://images.pexels.com/photos/18713194/pexels-photo-18713194/free-photo-of-sea-city-water-street.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="Profile Picture"/>
                <div className="userChatInfo">
                    <span>Alexa</span>
                    <p>Sample Message</p>
                </div>
            </div>
        </div>
        
        
    )
}
export default Chats