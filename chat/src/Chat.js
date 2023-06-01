import './Chat.css';
import LeftBar from './ChatScreen/LeftBar.js';
import ContactsBar from './ChatScreen/ContactsBar.js';
import ChatBox from './ChatScreen/ChatBox.js';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';


function Chat({curUser, setChats, msgIdCounter}) {

  const [curChat, setCurChat] = useState(null);
  const [selectedContact, setselectedContact] = useState(null);
  const navigate = useNavigate();

  const handleContactSelect = (chat) => {
    setCurChat(chat);
    const contact = curUser.username === chat.users[0].username ?
    chat.users[1] : chat.users[0];
    setselectedContact(contact);
  };

  const handleAddChat = (newChat) => {
    setChats((prevChats) => [...prevChats, newChat]);
  };

  const updateChatMessages = (chatId, updatedMessages) => {
    setChats((prevChats) =>
    prevChats.map((chat) => {
        if (chat.id === chatId) {
          chat.messages = updatedMessages;
        }
        return chat;
      })
    );
  };

  function handleLogOut(event) {
    event.preventDefault();
    navigate('/login');
  }
  return (
    <>
      <div id="background"></div>
      <LeftBar user={curUser} handleLogOut={handleLogOut}/>
      <ContactsBar user={curUser}
                   onChatSelect={handleContactSelect} onAddChat={handleAddChat}
                   />
      <ChatBox chat={curChat} user={curUser} selectedContact={selectedContact} setChat={setCurChat} 
               updateChatMessages={updateChatMessages} msgIdCounter={msgIdCounter}/>
    </>
  );
}

export default Chat;