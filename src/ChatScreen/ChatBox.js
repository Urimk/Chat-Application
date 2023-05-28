import React, { useState, useEffect, useRef } from "react";
import ProfilePic from "./ProfilePic";
import ChatButtons from "./ChatButtons.js";
import Message from "./Message.js";
import SendMessage from "./SendMessage.js";

function ChatBox({chat, selectedContact, setChat, updateChatMessages }) {
  const [chatMessages, setChatMessages] = useState({});
  const messagesContainerRef = useRef(null);
  const messages = chat ? chat.messages || [] : [];

  useEffect(() => {
    if (chat) {
      setChatMessages((prevMessages) => ({
        ...prevMessages,
        [chat.id]: {
          messages: chat.messages || [],
        },
      }));
    }
  }, [chat]);
  


  useEffect(() => {
    const container = messagesContainerRef.current;
    container.scrollTop = container.scrollHeight;
  }, [chat.messages]);

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
    if (chat) {
      const newMessage = {
        text: messageText,
        time: formatDateTime(new Date()),
      };
  
      const updatedMessages = [
        ...(chat.messages || []),
        newMessage,
      ];
  
      const updatedChat = {
        ...chat,
        messages: updatedMessages,
      };
  
      setChatMessages((prevMessages) => ({
        ...prevMessages,
        [chat.id]: {
          messages: updatedMessages,
        },
      }));
      updateChatMessages(chat.id, updatedMessages);
      setChat(updatedChat);
    }
  };
  return (
    <div id="chat_window">
      {selectedContact && (
        <>
          <ProfilePic pic={selectedContact.ProfilePic}/>
          <span className="username">{selectedContact.displayName}</span>
        </>
      )}
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
        selectedContact={selectedContact ? selectedContact.username : null}
      />
    </div>
  );
}

export default ChatBox;