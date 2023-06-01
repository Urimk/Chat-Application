import React, { useRef } from "react";
import ProfilePic from "./ProfilePic.js";


function Contact({ chat, onClick }) {
    const chatPreviewRef = useRef(null);

    const handleClick = () => {
      onClick(chat);
  
      const chatPreviews = document.querySelectorAll(".chat_preview");
  
      chatPreviews.forEach((chatPreview) => {
        chatPreview.classList.remove("current_chat");
      });
  
      chatPreviewRef.current.classList.add("current_chat");
    };
  
    const lastMessageTxt = chat.lastMessage ? chat.lastMessage.content : "You have no messages with this contact.";
    return (
      <div className="chat_preview" ref={chatPreviewRef} onClick={handleClick}>
        <ProfilePic pic={chat.user.profilePic}/>
        <span className="username">{chat.user.username}</span>
        <span className="msg_preview new_message">{lastMessageTxt}</span>

      </div>
    );
  }
  
  export default Contact;