import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LogIn from './log-in/Log-in';
import Sign from './sign-in/Sign';
import Chat from './Chat';



function App() {
  const [users, setUsers] = useState([
    { "username": "a", "password": "123456", "displayName": "big A", "ProfilePic": null, "registered": "no", "chats": []},
    { "username": "b", "password": "123456", "displayName": "big B", "ProfilePic": null, "registered": "no", "chats": []}
  ]);
  const [user, setUser] = useState(null);
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Sign users={users} setUsers={setUsers}/>} />
      <Route
          path="/chat"
          element={
            users.find(user => user.registered === "yes") ? (
              <Chat users={users} curUser={user}/>
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


