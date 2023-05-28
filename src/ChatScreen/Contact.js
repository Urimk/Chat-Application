import React, { useRef } from "react";
import ProfilePic from "./ProfilePic";


function Contact({ chat, user, onClick }) {
    const chatPreviewRef = useRef(null);
  
    const handleClick = () => {
      onClick(chat);
  
      const chatPreviews = document.querySelectorAll(".chat_preview");
  
      chatPreviews.forEach((chatPreview) => {
        chatPreview.classList.remove("current_chat");
      });
  
      chatPreviewRef.current.classList.add("current_chat");
    };
  
    console.log(chat);
    console.log(chat.messages);
    const lastMessageTxt = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].content : "You have no messages with this contact.";
    const lastMessageTime = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].time : chat.created;
    return (
      <div className="chat_preview" ref={chatPreviewRef} onClick={handleClick}>
        <ProfilePic pic={user.profilePic} online={0} />
        <span className="username">{chat.user.username}</span>
        <span className="timestamp">{lastMessageTime}</span>
        <span className="msg_preview new_message">{lastMessageTxt}</span>
      </div>
    );
  }
  
  export default Contact;