import React, { useState, useEffect, useRef } from "react";
import ProfilePic from "./ProfilePic";
import ChatButtons from "./ChatButtons.js";
import Message from "./Message.js";
import SendMessage from "./SendMessage.js";

function ChatBox({ selectedContact, setselectedContact, updateContactMessages }) {
  const [contactMessages, setContactMessages] = useState({});
  const messagesContainerRef = useRef(null);
  const messages = selectedContact ? contactMessages[selectedContact.name] || [] : [];


  useEffect(() => {
    if (selectedContact) {
      setContactMessages((prevMessages) => ({
        ...prevMessages,
        [selectedContact.name]: prevMessages[selectedContact.name] || selectedContact.messages || [],
      }));
    }
  }, [selectedContact]);


  useEffect(() => {
    const container = messagesContainerRef.current;
    container.scrollTop = container.scrollHeight;
  }, [contactMessages]);

  const formatDateTime = (dateTime) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",   
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };
    return dateTime.toLocaleString("en-US", options);
  };

  const handleSendMessage = (messageText) => {
    if (selectedContact) {
      const newMessage = {
        text: messageText,
        time: formatDateTime(new Date()),
      };
  
      const updatedMessages = [
        ...(contactMessages[selectedContact.name] || []),
        newMessage,
      ];
  
      const updatedContact = {
        ...selectedContact,
        messages: updatedMessages,
      };
  
      setContactMessages((prevMessages) => ({
        ...prevMessages,
        [selectedContact.name]: updatedMessages,
      }));
  
      updateContactMessages(selectedContact.name, updatedMessages);
      setselectedContact(updatedContact);
    }
  };
  return (
    <div id="chat_window">
      {selectedContact && (
        <>
          <ProfilePic pic={selectedContact.img} online={0} />
          <span className="username">{selectedContact.name}</span>
        </>
      )}
      <span id="online_status"></span>
      <ChatButtons />
      <div id="messages" ref={messagesContainerRef}>
      {messages.slice().reverse().map((message, index) => {
        return (
            <Message
            key={index}
            text={message.text}
            time={message.time}
            incoming={0}
            />
        );
        })}
      </div>
      <SendMessage
        onSendMessage={handleSendMessage}
        selectedContact={selectedContact ? selectedContact.name : null}
      />
    </div>
  );
}

export default ChatBox;