import './Chat.css';
import LeftBar from './ChatScreen/LeftBar.js';
import ContactsBar from './ChatScreen/ContactsBar.js';
import ChatBox from './ChatScreen/ChatBox.js';
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

function Chat({ users, curUser }) {

  const [chats, setChats] = useState(curUser.chat || []);
  const [selectedContact, setselectedContact] = useState(null);
  const navigate = useNavigate();

  const handleContactSelect = (contact) => {
    setselectedContact(contact);
  };

  const handleAddChat = (newChat) => {
    setChats((prevChats) => [...prevChats, newChat]);
  };

  const updateContactMessages = (contactName, updatedMessages) => {
    setChats((prevContacts) =>
      prevContacts.map((contact) => {
        if (contact.name === contactName) {
          return {
            ...contact,
            messages: updatedMessages,
          };
        }
        return contact;
      })
    );
  };

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
      <ChatBox selectedContact={selectedContact} setselectedContact={setselectedContact} 
               updateContactMessages={updateContactMessages}/>
    </>
  );
}

export default Chat;