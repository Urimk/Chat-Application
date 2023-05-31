import React, { useRef } from "react";
import ProfilePic from "./ProfilePic";


function Contact({ chat, user, onClick }) {
    const chatPreviewRef = useRef(null);

    const otherUser = chat.users[0].username === user.username ? chat.users[1] : chat.users[0];

    const handleClick = () => {
      onClick(chat);
  
      const chatPreviews = document.querySelectorAll(".chat_preview");
  
      chatPreviews.forEach((chatPreview) => {
        chatPreview.classList.remove("current_chat");
      });
  
      chatPreviewRef.current.classList.add("current_chat");
    };
  
    const lastMessageTxt = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].content : "You have no messages with this contact.";
    const lastMessageTime = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].time : chat.created;
    return (
      <div className="chat_preview" ref={chatPreviewRef} onClick={handleClick}>
        <ProfilePic pic={otherUser.profilePic}/>
        <span className="username">{otherUser.username}</span>
        <span className="timestamp">{lastMessageTime}</span>
        <span className="msg_preview new_message">{lastMessageTxt}</span>

      </div>
    );
  }
  
  export default Contact;