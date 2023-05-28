import './Chat.css';
import LeftBar from './ChatScreen/LeftBar.js';
import ContactsBar from './ChatScreen/ContactsBar.js';
import ChatBox from './ChatScreen/ChatBox.js';
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

function Chat({ users, curUser }) {

  const [curChat, setCurChat] = useState(null);
  const [chats, setChats] = useState(curUser.chat || []);
  const [selectedContact, setselectedContact] = useState(null);
  const navigate = useNavigate();

  const handleContactSelect = (contact) => {
    findChat(chats, contact)
    setselectedContact(contact);
  };

  const handleAddChat = (newChat) => {
    setChats((prevChats) => [...prevChats, newChat]);
  };

  const updateChatMessages = (chatId, updatedMessages) => {
    setChats((prevChats) =>
    prevChats.map((chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: updatedMessages,
          };
        }
        return chat;
      })
    );
  };

  function findChat(chats, otherUser) {
    for (const chat of chats) {
      const user = chat.user;
  
      if (user.username === otherUser) {
        setCurChat(chat);
      }
    }
  }

  function handleLogOut(event) {
    event.preventDefault();
    navigate('/login');
  }

  console.log(handleLogOut, "2");
  return (
    <>
      <div id="background"></div>
      <LeftBar user={curUser} handleLogOut={handleLogOut}/>
      <ContactsBar users={users} contacts={contacts} onContactSelect={handleContactSelect} onAddChat={handleAddChat} />
      <ChatBox chat={curChat} selectedContact={selectedContact} setChat={setCurChat} 
               updateContactMessages={updateChatMessages}/>
    </>
  );
}

export default Chat;