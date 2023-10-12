import React from 'react'
import "../styling/DirectMessage.css"
import Attach from "../pictures/attach.png"
const Input = () => {
  return (
    <div className="input">
        <input type="text" placeholder="Type here!"/>
        <div className="send">
            <img src="" alt="Picture"/>
            <input type="file" style={{display: "none"}} id="file"/>
            <label htmlFor="file">
                <img src="" alt="File"/>
            </label>
            <button>Send</button>
        </div>
    </div>
  )
}

export default Input