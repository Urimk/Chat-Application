import './App.css';
import LeftBar from './components/LeftBar.js';
import ContactsBar from './components/ContactsBar.js';
import ChatBox from './components/ChatBox.js';
import React, { useState } from "react";

function App({ user, setUser}) {

  //REMOVE
  const temp = {
    name: "Default User",
    picture: "profile_pics/NO_PIC",
    contacts: []
  };


  //change to //Line and remove 2
  const [defaultUser, setDefaultUser] = useState(temp);
  //const [contacts, setContacts] = useState(user.contacts || []);
  const [contacts, setContacts] = useState(defaultUser.contacts || []);
  const [selectedContact, setSelectedContact] = useState(null);



  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  //remove default
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

  return (
    <>
      <div id="background"></div>
      <LeftBar username={defaultUser}/>
      <ContactsBar contacts={contacts} onContactSelect={handleContactSelect} onAddContact={handleAddContact} />
      <ChatBox selectedContact={selectedContact} setSelectedContact={setSelectedContact} 
               updateContactMessages={updateContactMessages}/>
    </>
  );
}

export default App;
