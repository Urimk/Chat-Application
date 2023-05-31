import './Chat.css';
import LeftBar from './ChatScreen/LeftBar.js';
import ContactsBar from './ChatScreen/ContactsBar.js';
import ChatBox from './ChatScreen/ChatBox.js';
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

function Chat({ user }) {

  const [contacts, setContacts] = useState(user.contacts || []);
  const [selectedContact, setselectedContact] = useState(null);
  const navigate = useNavigate();

  const handleContactSelect = (contact) => {
    setselectedContact(contact);
  };

  const handleAddContact = (updatedContacts) => {
    setContacts(updatedContacts);
  };

  const updateContactMessages = (contactName, updatedMessages) => {
    setContacts((prevContacts) =>
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
      <LeftBar user={user} handleLogOut={handleLogOut}/>
      <ContactsBar contacts={contacts} onContactSelect={handleContactSelect} onAddContact={handleAddContact} />
      <ChatBox selectedContact={selectedContact} setselectedContact={setselectedContact} 
               updateContactMessages={updateContactMessages}/>
    </>
  );
}

export default Chat;