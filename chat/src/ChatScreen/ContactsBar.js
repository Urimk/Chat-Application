import React, { useState, useRef, useEffect } from "react";
import Contact from "./Contact.js";

function ContactsBar({ user, onChatSelect, onAddChat }) {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [newContactName, setNewContactName] = useState("");
  const [fetchedChats, setFetchedChats] = useState([]);
  const overlayRef = useRef(null);

  useEffect(() => {
    getChats();
  }, []);

  async function handleAddChat() {
  const contact = { username: newContactName };
    const res = await fetch('http://localhost:5000/api/Chats', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      'body': JSON.stringify(contact)
    });
    if (res.status != 200){
      if(res.status == 401){
        alert('You need to log in first!')
      }
      if (res.status == 400) {
        alert('No such user')
      }
    }
    const data = await res.json();
    const newChat = {
      id: data.id,
      user:
      {
        "username": data.user.username,
        "displayName": data.user.displayName,
        "profilePic": data.user.profilePic
      },
    }
    setPopupVisible(false);
    setFetchedChats((prevChats) => [...prevChats, newChat]);
    onAddChat(newChat);
  };

  async function handleChatClick(clickedChat) {
    const chats = await getChats();
    const id = chats.find((chat) => chat.id === clickedChat.id).id;
    const res = await fetch(`http://localhost:5000/api/Chats/${id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
    });
    if (res.status != 200){
      if(res.status == 401){
        alert('Unauthorized!')
      }
    }
    const data = await res.json();
    onChatSelect(data);
  }

  const handlePopupToggle = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleOverlayClick = () => {
    if (isPopupVisible) {
      return;
    }
  };

  useEffect(() => {
    if (isPopupVisible) {
      overlayRef.current.addEventListener("click", handleOverlayClick);
    }
    return () => {
      if (overlayRef.current) {
        overlayRef.current.removeEventListener("click", handleOverlayClick);
      }
    };
  }, [isPopupVisible]);

  async function getChats() {
    const res = await fetch('http://localhost:5000/api/Chats', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
    });
    if (res.status != 200){
      if(res.status == 401){
        alert('You need to log in first!')
      }
    }
    const data = await res.json();
    setFetchedChats(data);
    return data;
  }
  
  return (
    <div id="chats_bar">
      <div id="chat_bar_line1">
        <span id="chats_title">Contacts</span>
        <span id="more_icon" onClick={handlePopupToggle}>
          +
        </span>
      </div>
      <div id="chats">
        {fetchedChats &&
         fetchedChats.map((chat) => (
            <Contact
            key={chat.id}
            chat={chat}
            onClick={() => handleChatClick(chat)}

            />
        ))}
        {/* Render the popup if exists */}
        {isPopupVisible && (
          <div>
            <div className="overlay" ref={overlayRef}></div>
            <div id="popup">
              <div id="popup_content">
                <p>Add a new contact</p>
                <span>Name</span>
                <input
                  type="text"
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                />
                <button id="cancel_button" onClick={() => setPopupVisible(false)}>
                  Cancel
                </button>
                <button id="add_button" onClick={handleAddChat}>
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactsBar;
