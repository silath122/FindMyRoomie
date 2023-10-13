import React from 'react'
import "../styling/DirectMessage.css"
const Message = () => {
  return (
    <div className="message owner">
      <div className="messageInfo">
        <img src="https://images.pexels.com/photos/18713194/pexels-photo-18713194/free-photo-of-sea-city-water-street.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" 
        alt =""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>hello</p>
        <img src="https://images.pexels.com/photos/18713194/pexels-photo-18713194/free-photo-of-sea-city-water-street.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" 
        alt=""
        />
      </div>
    </div>
  )
}
export default Message;
