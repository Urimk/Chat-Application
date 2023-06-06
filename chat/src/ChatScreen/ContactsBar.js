import React, { useState, useRef, useEffect } from "react";
import Contact from "./Contact.js";

function ContactsBar({ user, onChatSelect, onAddChat, fetchedChats, setFetchedChats, getMessages }) {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [newContactName, setNewContactName] = useState("");
  const overlayRef = useRef(null);

  useEffect(() => {
    getChats();
  }, []);

  async function getLastMessage(chat) {
    if (chat && chat.messages && chat.messages.length > 0) {
      chat.messages.sort((a, b) => b.id - a.id);
      return chat.messages[0];
    }
    return null;
  }


  async function handleAddChat() {
  const contact = { username: newContactName };
    const res = await fetch('http://localhost:12345/api/Chats', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + user.token
      },
      'body': JSON.stringify(contact)
    });
    if (res.status != 200){
      const errorMessage = await res.text();
      alert(res.status + " " + res.statusText + "\n" + errorMessage);
    } else {
      const data = await res.json();
      const newChat = {
        id: data.id,
        user:
        {
          "username": data.users[0].username,
          "displayName": data.users[0].displayName,
          "profilePic": data.users[0].profilePic
        },
        lastMessage: null
      }
      setPopupVisible(false);
      setFetchedChats((prevChats) => [...prevChats, newChat]);
      onAddChat(newChat);
    };
  }

  async function handleChatClick(clickedChat) {
    const id = clickedChat.id;
    const res = await fetch(`http://localhost:12345/api/Chats/${id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
    });
    if (res.status != 200){
      const errorMessage = await res.text();
      alert(res.status + " " + res.statusText + "\n" + errorMessage);
    } else {
      const data = await res.json();
      onChatSelect(data);
    }
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
    try {
        const res = await fetch('http://localhost:12345/api/Chats', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
          'user': `${user.username}`
        },
      });
      if (res.status != 200){
        if (res.status == 404) {
          return;
        }
        const errorMessage = await res.text();
        alert(res.status + " " + res.statusText + "\n" + errorMessage);
      } else {
        const data = await res.json();
        const updatedChats = [];
        for (const chat of data) {
          const lastMessage = await getLastMessage(chat);
          const updatedChat = {
            ...chat,
            lastMessage: lastMessage,
          };
          updatedChats.push(updatedChat);
        }
        setFetchedChats(updatedChats);
        return data;
      }

    } catch (error) {
      console.error('Error:', error);
    }
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
