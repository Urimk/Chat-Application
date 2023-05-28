import React, { useState, useRef, useEffect } from "react";
import Contact from "./Contact";

function ContactsBar({users, user, chats, onChatSelect, onAddChat }) {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [newContactName, setNewContactName] = useState("");
  const [newContact, setNewContact] = useState(null);
  const overlayRef = useRef(null);

  const handleAddChat = () => {
    let chatIdCounter = 1;

    if (newContactName.trim() === "") {
      return;
    }

    const existingUser = users.find((user) => user.username === newContactName);
    console.log(user);
    console.log(newContactName);
    if (!existingUser) {
      return;
    }
    setNewContact(existingUser);

    const currentTime = new Date().toLocaleString();
    
    const newChat = {
      id: chatIdCounter++,
      users: [
      {
        "username": user.username,
        "displayName": user.displayName,
        "profilePic": user.profilePic
      },
      {
        "username": newContactName,
        "displayName": existingUser.displayName,
        "profilePic": existingUser.profilePic
      }
    ],
      lastMessage: null,
      created: currentTime,
      messages: []
    };

    setPopupVisible(false);
    onAddChat(newChat);
  };

  const handlePopupToggle = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleChatClick = (clickedChat) => {
    const selectedChat = chats.find((chat) => chat.id === clickedChat.id);
    onChatSelect(selectedChat);
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
  
  return (
    <div id="chats_bar">
      <div id="chat_bar_line1">
        <span id="chats_title">Contacts</span>
        <span id="more_icon" onClick={handlePopupToggle}>
          +
        </span>
      </div>
      <div id="chats">
        {chats &&
         chats.map((chat) => (
            <Contact
            key={chat.id}
            chat={chat}
            user={newContact}
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
