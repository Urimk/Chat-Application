import './App.css';
import LeftBar from './components/LeftBar.js';
import ContactsBar from './components/ContactsBar.js';
import ChatBox from './components/ChatBox.js';
import React, { useState } from "react";

function App() {

  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedContactPP, setSelectedContactPP] = useState(null);


  const handleContactSelect = (username, profilePic) => {
    setSelectedContact(username);
    setSelectedContactPP(profilePic);
  };

  return (
    <>
      <div id="background"></div>
      <LeftBar />
      <ContactsBar onContactSelect={handleContactSelect} />
      <ChatBox selectedContact={selectedContact} setSelectedContact={setSelectedContact} selectedContactPP={selectedContactPP} />
    </>
  );
}

export default App;
