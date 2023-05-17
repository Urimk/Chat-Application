import React, { useState } from "react";
import ProfilePic from "./ProfilePic";
import ChatButtons from "./ChatButtons.js";
import Message from "./Messege.js";
import SendMessege from "./SendMessage.js";

function ChatBox({ selectedContact, selectedContactPP, contacts, setContacts }) {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (messageText) => {
    const newMessage = {
      text: messageText,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    if (contacts && contacts.length > 0) {
      const updatedContact = {
        ...contacts[0],
        messages: [...contacts[0].messages, newMessage],
      };

      setContacts([updatedContact]);
    }
  };

  return (
    <div id="chat_window">
      {selectedContact && (
        <>
          <ProfilePic pic={selectedContactPP} online={0} />
          <span className="username">{selectedContact}</span>
        </>
      )}
      <span id="online_status"></span>
      <ChatButtons />
      <div id="messages">
        {messages.map((message, index) => (
          <Message
            key={index}
            text={message.text}
            time={message.time}
            incoming={0}
          />
        ))}
      </div>
      <SendMessege
        onSendMessage={handleSendMessage}
        selectedContact={selectedContact}
      />
    </div>
  );
}

export default ChatBox;
