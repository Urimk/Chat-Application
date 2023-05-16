import React, { useState } from "react";
import ProfilePic from "./ProfilePic";
import ChatButtons from "./ChatButtons.js";
import Message from "./Messege.js";
import SendMessege from "./SendMessege.js";

function ChatBox({ selectedContact , selectedContactPP }) {

    const [messages, setMessages] = useState([]);

    const handleSendMessage = (messageText) => {
        const newMessage = {
          text: messageText,
          time: new Date().toLocaleTimeString(),
        };
      
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      };

    return (
    <div id="chat_window">
        {selectedContact && (
        <>
            <ProfilePic pic={ selectedContactPP} online={ 0 } />
            <span className="username">{selectedContact}</span>
        </>
        )}
        <span id="online_status"></span>
        <ChatButtons />
        <div id="messages">
            {messages.map((message, index) => (
                <Message key={index} text={message.text} time={message.time} incoming = { 0 } />
            ))}
        </div>
        <SendMessege onSendMessage={handleSendMessage} selectedContact={selectedContact} />
    </div>
    );
}

export default ChatBox;
