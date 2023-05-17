import React, { useRef } from "react";
import ProfilePic from "./ProfilePic";


function Contact({ contact,  onClick }) {

  const chatPreviewRef = useRef(null);

  const handleClick = () => {
    onClick(contact);

    const chatPreviews = document.querySelectorAll(".chat_preview");

    chatPreviews.forEach((chatPreview) => {
      chatPreview.classList.remove("current_chat");
    });

    chatPreviewRef.current.classList.add("current_chat");
  };

  return (
    <div className="chat_preview" ref={chatPreviewRef} onClick={handleClick}>
        <ProfilePic pic={contact.picture} online = { 0 } />
        <span className="username">{contact.name}</span>
        <span className="timestamp">{contact.timestamp}</span>
        <span className="msg_preview new_message">You have no messeges with this contact.</span>
    </div>
    );
  }
  
  export default Contact;