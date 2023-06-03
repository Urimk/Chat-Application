import React, { useState, useEffect, useRef } from "react";
import ProfilePic from "./ProfilePic.js";
import ChatButtons from "./ChatButtons.js";
import Message from "./Message.js";
import SendMessage from "./SendMessage.js";
import io from 'socket.io-client';

function ChatBox({ chat, user, selectedContact, setChat, updateChatMessages, handleDeleteChat, updateLastMessage, getMessages }) {
  const [chatMessages, setChatMessages] = useState([]);
  const messagesContainerRef = useRef(null);
  const messages = chat ? chat.messages || [] : [];
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    newSocket.on('message', (data) => {
      setChatMessages((prevMessages) => [...prevMessages, data]);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (chat) {
      getMessages(chat)
        .then((data) => {
          setChatMessages(data);
        });
    }
  }, [chat, getMessages]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container && chat) {
      container.scrollTop = container.scrollHeight;
    }
  }, [chat]);

  async function handleSendMessage(messageText) {
    if (chat && socket) {
      const msg = { msg: messageText };
      const id = chat.id;

      const res = await fetch(`http://localhost:5000/api/Chats/${id}/Messages`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(msg)
      });

      if (res.status !== 200) {
        const errorMessage = await res.text();
        alert(res.status + " " + res.statusText + "\n" + errorMessage);
      } else {
        const data = await res.json();
        const newMessage = {
          id: data.id,
          created: data.created,
          sender: {
            "username": data.sender.username,
            "displayName": data.sender.displayName,
            "profilePic": data.sender.profilePic
          },
          content: data.content
        }

        socket.emit('message', newMessage);

        const updatedMessages = [
          ...(chat.messages || []),
          newMessage,
        ];

        const updatedChat = {
          ...chat,
          messages: updatedMessages,
          lastMessage: newMessage
        };

        setChatMessages(updatedMessages);
        updateChatMessages(chat.id, updatedMessages);
        setChat(updatedChat);
        updateLastMessage(updatedChat);
      }
    }
  }

  return (
    <div id="chat_window">
      {selectedContact && (
        <>
          <ProfilePic pic={selectedContact.profilePic} />
          <span className="username">{selectedContact.displayName}</span>
        </>
      )}
      <ChatButtons chat={chat} handleDeleteChat={handleDeleteChat} />
      <div id="messages" ref={messagesContainerRef}>
        {messages.slice().reverse().map((message, index) => {
          const incoming = message.sender.username === user.username ? 0 : 1;
          return (
            <Message
              key={index}
              text={message.content}
              dateAndTime={message.created}
              incoming={incoming}
            />
          );
        })}
      </div>
      <SendMessage
        onSendMessage={handleSendMessage}
        selectedContact={selectedContact ? selectedContact.username : null}
      />
    </div>
  );
}

export default ChatBox;
