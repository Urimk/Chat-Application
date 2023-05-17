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
  const [selectedContactName, setSelectedContactName] = useState(null);
  const [selectedContactPP, setSelectedContactPP] = useState(null);
  //const [contacts, setContacts] = useState(user.contacts || []);
  const [contacts, setContacts] = useState(defaultUser.contacts || []);


  const handleContactSelect = (contact) => {
    setSelectedContactName(contact.name);
    setSelectedContactPP(contact.picture);
  };

  //remove default
  const handleAddContact = (updatedContacts) => {
    setContacts(updatedContacts);
  };

  return (
    <>
      <div id="background"></div>
      <LeftBar username={defaultUser}/>
      <ContactsBar contacts={contacts} onContactSelect={handleContactSelect} onAddContact={handleAddContact} />
      <ChatBox selectedContact={selectedContactName} selectedContactPP={selectedContactPP} contact={contacts} setContacts={contacts} />
    </>
  );
}

export default App;
