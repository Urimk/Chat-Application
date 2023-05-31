import React, { useState, useEffect, useRef } from "react";
import ProfilePic from "./ProfilePic";
import ChatButtons from "./ChatButtons.js";
import Message from "./Message.js";
import SendMessage from "./SendMessage.js";

function ChatBox({chat, user, selectedContact, setChat, updateChatMessages, msgIdCounter }) {
  const [chatMessages, setChatMessages] = useState({});
  const messagesContainerRef = useRef(null);
  const messages = chat ? chat.messages || [] : [];

  useEffect(() => {
    if (chat) {
      setChatMessages((prevMessages) => ({
        ...prevMessages,
        [chat]: {
          messages: chatMessages || [],
        },
      }));
    }
  }, [chat]);
  


  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container && chat) {
      container.scrollTop = container.scrollHeight;
    }
  }, [chat]);

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
        id: msgIdCounter.current++,
        content: messageText,
        time: formatDateTime(new Date()),
        sender: user
      };
  
      const updatedMessages = [
        ...(chat.messages || []),
        newMessage,
      ];
  
      const updatedChat = {
        ...chat,
        messages: updatedMessages,
        lastMessage: messageText
      };

      console.log(updatedMessages);
      console.log(updatedChat);
  
      setChatMessages((prevMessages) => ({
        ...prevMessages,
        [chat]: {
          messages: updatedMessages,
          lastMessage: messageText
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
          <ProfilePic pic={selectedContact.profilePic}/>
          <span className="username">{selectedContact.displayName}</span>
        </>
      )}
      <ChatButtons />
      <div id="messages" ref={messagesContainerRef}>
      {messages.slice().reverse().map((message, index) => {
        const incoming = message.sender.username === user.username ? 0 : 1;
        return (
            <Message
            key={index}
            text={message.content}
            time={message.time}
            incoming={incoming}
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