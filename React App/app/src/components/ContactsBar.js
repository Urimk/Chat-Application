import React, { useState, useRef, useEffect } from "react";
import Contact from "./Contact";

function ContactsBar() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [newContactName, setNewContactName] = useState("");
  const [contacts, setContacts] = useState([]);
  const overlayRef = useRef(null);

  const handleAddContact = () => {
    setContacts((prevContacts) => [
        ...prevContacts,
        { username: newContactName }
      ]);
    setNewContactName("");
    setPopupVisible(false);
  };

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

  return (
    <div id="chats_bar">
      <div id="chat_bar_line1">
        <span id="chats_title">Contacts</span>
        <span id="more_icon" onClick={handlePopupToggle}>
          +
        </span>
      </div>
      <div id="chats">
        {contacts.map((contact, index) => (
          <Contact key={index} username={contact.username} />
        ))}
        {/* Render the popup if exsits */}
        {isPopupVisible && (
          <div>
            <div className="overlay" ref={overlayRef}></div>
            <div id="popup">
              <div id="popup_content">
                <p>Add a new contact</p>
                <span>Name</span>
                <input type="text" value={newContactName}
                 onChange={(e) => setNewContactName(e.target.value)}
                />
                <button id="cancel_button" onClick={() => setPopupVisible(false)}>Cancel</button>
                <button id="add_button" onClick={handleAddContact}>Add</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactsBar;