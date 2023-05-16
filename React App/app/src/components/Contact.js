import React, { useRef } from "react";
import ProfilePic from "./ProfilePic";


function Contact({ username, profilePic,  onClick }) {

  const currentTime = new Date().toLocaleString();
  const chatPreviewRef = useRef(null);

  const handleClick = () => {
    onClick(username, profilePic);
    const chatPreviews = document.getElementsByClassName("chat_preview");

    for (let i = 0; i < chatPreviews.length; i++) {
      const chatPreview = chatPreviews[i];
      if (chatPreview.id === "current_chat") {
        chatPreview.id = "";
      }
    }

    chatPreviewRef.current.id = "current_chat";
  };

  return (
    <div className="chat_preview" ref={chatPreviewRef} onClick={handleClick}>
        <ProfilePic pic={profilePic} online = { 0 } />
        <span className="username">{username}</span>
        <span className="timestamp">{currentTime}</span>
        <span className="msg_preview new_message">You have no messeges with this contact.</span>
    </div>
    );
  }
  
  export default Contact;