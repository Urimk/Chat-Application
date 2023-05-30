import './Chat.css';
import LeftBar from './ChatScreen/LeftBar.js';
import ContactsBar from './ChatScreen/ContactsBar.js';
import ChatBox from './ChatScreen/ChatBox.js';
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

function Chat({ users, curUser }) {

  const [curChat, setCurChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedContact, setselectedContact] = useState(null);
  const navigate = useNavigate();

  const handleContactSelect = (contact) => {
    findChat(chats, contact.username)
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
      let user = chat.users[0];
  
      if (user.username === otherUser) {
        setCurChat(chat);
        return;
      }
      user = chat.users[1];
  
      if (user.username === otherUser) {
        setCurChat(chat);
        return;
      }
    }
  }

  function handleLogOut(event) {
    event.preventDefault();
    navigate('/login');
  }

  return (
    <>
      <div id="background"></div>
      <LeftBar user={curUser} handleLogOut={handleLogOut}/>
      <ContactsBar users={users} user={curUser} chats={chats} 
                   onChatSelect={handleContactSelect} onAddChat={handleAddChat} />
      <ChatBox chat={curChat} selectedContact={selectedContact} setChat={setCurChat} 
               updateChatMessages={updateChatMessages}/>
    </>
  );
}

export default Chat;