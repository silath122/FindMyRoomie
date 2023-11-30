import React from 'react'
import "../styling/DirectMessage.css"
import {ChatContext} from "../context/ChatContext";
import {AuthContext} from "../context/AuthContext";
import {useContext, useRef, useEffect, useState} from "react";
import {firestore} from "../firebase";
import {getDoc, doc} from "firebase/firestore";
// const Message = ({message}) => {
//   const {currentUser} = useContext(AuthContext)
//   const {data} = useContext(ChatContext)
   
//   const ref = useRef();


//   useEffect(()=>{
//     ref.current?.scrollIntoView({behavior: "smooth"});
//   },[message]);

//   console.log(message)
//   //randomly picks whether message will be owner or other person for showcase purposes
//   console.log(currentUser)

//   return (
    
//        <div
//       ref={ref}
//       className={`message ${message.senderID === currentUser.uid && "owner"}`}
//     >
//       <div className="messageInfo">
//         <img
//           src={message.senderID === currentUser.uid
//             ? currentUser.profileImage
//             : data.user.profileImage}
//           alt="" />
//       </div>
//       <div className="messageContent">
//         <p>{message.content}</p>
//         {message.attachment && <img src={message.attachment} alt="" />}
//       </div>
//     </div> 

//   )
// }


// export default Message;
//CHAT GPT CODE

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();
  const [userData, setUserData] = useState(null); // Use state to manage userData

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDocRef = doc(firestore, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();
        setUserData(userData); // Update the state with the fetched data
        console.log(userData);
        // Do something with userData if needed
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();

    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message, currentUser]);

  if (!userData) {
    // If userData is still loading, you can render a loading state or return null
    return null;
  }

  return (
    <div
      ref={ref}
      className={`message ${message.senderID === currentUser.uid && 'owner'}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderID === currentUser.uid
              ? userData.profileImage
              : data.user.profileImage
          }
          alt=""
        />
      </div>
      <div className="messageContent">
        <p>{message.content}</p>
        {message.attachment && <img src={message.attachment} alt="" />}
      </div>
    </div>
  );
};

export default Message;