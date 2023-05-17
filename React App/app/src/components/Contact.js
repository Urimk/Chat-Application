import React, { useRef } from "react";
import ProfilePic from "./ProfilePic";


function Contact({ contact, onClick }) {
    const chatPreviewRef = useRef(null);
  
    const handleClick = () => {
      onClick(contact);
  
      const chatPreviews = document.querySelectorAll(".chat_preview");
  
      chatPreviews.forEach((chatPreview) => {
        chatPreview.classList.remove("current_chat");
      });
  
      chatPreviewRef.current.classList.add("current_chat");
    };
  
    const lastMessage = contact.messages.length > 0 ? contact.messages[contact.messages.length - 1].text : "You have no messages with this contact.";
    const lastMessageTime = contact.messages.length > 0 ? contact.messages[contact.messages.length - 1].time : contact.timestamp;
    return (
      <div className="chat_preview" ref={chatPreviewRef} onClick={handleClick}>
        <ProfilePic pic={contact.picture} online={0} />
        <span className="username">{contact.name}</span>
        <span className="timestamp">{lastMessageTime}</span>
        <span className="msg_preview new_message">{lastMessage}</span>
      </div>
    );
  }
  
  export default Contact;
  