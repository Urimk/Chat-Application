import './Chat.css';
import LeftBar from './ChatScreen/LeftBar.js';
import ContactsBar from './ChatScreen/ContactsBar.js';
import ChatBox from './ChatScreen/ChatBox.js';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';


function Chat({curUser, setChats, msgIdCounter}) {

  const [curChat, setCurChat] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [fetchedChats, setFetchedChats] = useState([]);
  const navigate = useNavigate();

  const handleContactSelect = (chat) => {
    setCurChat(chat);
    const contact = curUser.username === chat.users[0].username ?
    chat.users[1] : chat.users[0];
    setSelectedContact(contact);
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

  async function handleDeleteChat(chat) {
    const id = chat.id
    const res = await fetch(`http://localhost:12345/api/Chats/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${curUser.token}`
      },
    });
    if (res.status != 204){
      const errorMessage = await res.text();
      alert(res.status + " " + res.statusText + "\n" + errorMessage);
    } else {
      setFetchedChats(prevChats => prevChats.filter(c => c.id !== id));
      setSelectedContact(null);
    }
  }

  async function updateLastMessage(updatedChat) {
    const updatedChats = fetchedChats.map((chat) => {
      if (chat.id === updatedChat.id) {
        return {
          ...chat,
          lastMessage: updatedChat.lastMessage,
        };
      }
      return chat;
    });
    setFetchedChats(updatedChats);
  }

  async function getMessages(chat) {
    const id = chat.id;
    const res = await fetch(`http://localhost:12345/api/Chats/${id}/Messages`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer '  + curUser.token
      },
    });
    if (res.status != 200){
      const errorMessage = await res.text();
      alert(res.status + " " + res.statusText + "\n" + errorMessage);
    } else {
      const data = await res.json();
      return(data);
    }
  }

  return (
    <>
      <div id="background"></div>
      <LeftBar user={curUser} handleLogOut={handleLogOut}/>
      <ContactsBar user={curUser}
                   onChatSelect={handleContactSelect} onAddChat={handleAddChat}
                   fetchedChats={fetchedChats} setFetchedChats={setFetchedChats}
                   getMessages={getMessages}/>
      <ChatBox chat={curChat} user={curUser} selectedContact={selectedContact}
               setSelectedContact={setSelectedContact} setChat={setCurChat} 
               updateChatMessages={updateChatMessages} msgIdCounter={msgIdCounter}
               handleDeleteChat={handleDeleteChat} updateLastMessage={updateLastMessage}
               getMessages={getMessages}/>
    </>
  );
}

export default Chat;