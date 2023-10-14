import React from 'react'
import "../styling/DirectMessage.css"
import Attach from "../pictures/attach.png"
const Input = () => {
  return (
    <div className="input">
        <input type="text" placeholder="Type here!"/>
        <div className="send">
            <input type="file" style={{display: "none"}} id="file"/>
            <label htmlFor="file">
                <img src={Attach} alt="File"/>
            </label>
            <button>Send</button>
        </div>
    </div>
  )
}

export default Input