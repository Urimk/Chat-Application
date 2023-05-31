import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LogIn from './log-in/Log-in';
import Sign from './sign-in/Sign';
import Chat from './Chat';



function App() {
  const [users, setUsers] = useState([
    { "userName": "a", "password": "123456", "display": "big A", "img": null, "registered": "no", "contacts": []},
    { "userName": "b", "password": "123456", "display": "big B", "img": null, "registered": "no", "contacts": []}
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
              <Chat user={user}/>
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


