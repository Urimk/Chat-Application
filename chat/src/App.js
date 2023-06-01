import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import LogIn from './log-in/Log-in.js';
import Sign from './sign-in/Sign.js';
import Chat from './Chat.js';



function App() {
  const msgIdCounter = useRef(1);
  const [users, setUsers] = useState([
    { "username": "a", "password": "123456", "displayName": "big A", "profilePic": null, "registered": "yes", "chats": []},
    { "username": "b", "password": "123456", "displayName": "big B", "profilePic": null, "registered": "yes", "chats": []}
  ]);
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Sign users={users} setUsers={setUsers}/>} />
      <Route
          path="/chat"
          element={
            users.find(user => user.registered === "yes") ? (
              <Chat curUser={user}setChats={setChats} 
                    msgIdCounter={msgIdCounter} chatIdCounter={chatIdCounter}/>

            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<LogIn users={users} setUsers={setUsers} setUser={setUser} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;


