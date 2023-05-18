import React, { useState } from 'react';
import Display from './displayName/Display';
import Password from './password/Password';
import Image from './image/Image';
import Username from './userName/Username';
import { Link, useNavigate } from 'react-router-dom';

function Sign({ users, setUsers }) {
  const navigate = useNavigate();
  const [isNameReady, setIsNameReady] = useState(null);
  const [isPasswordReady, setIsPasswordReady] = useState(null);
  const [isDisplayReady, setIsDisplayReady] = useState(null);

  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [display, setDisplay] = useState(null);
  const [picture, setPicture] = useState(null);

  function handleSubmit(event) {
    if (isNameReady && isPasswordReady && isDisplayReady) {
      event.preventDefault();
      const newUser = {
        userName: name,
        password: password,
        display: display,
        img: picture,
        registered: "no",
        contacts: []
      };
      setUsers(prevUsers => [...prevUsers, newUser]); // Add the new user to the existing users array
      navigate('/login'); // Navigate to the LogIn component
    }
  }

  return (
    <div>
      <div className="patterns sea"></div>
      <form onSubmit={handleSubmit}>
        <div className="container-fluid" id="sign-screen">
          <Username users={users} setIsReady={setIsNameReady} setVal={setName} />
          <Password setIsReady={setIsPasswordReady} setVal={setPassword} />
          <Display users={users} setIsReady={setIsDisplayReady} setVal={setDisplay} />
          <Image setVal={setPicture} />
          <div>
            <button type="submit" className="btn btn-primary screen-foot" id="login">
              Register
            </button>
            <span className="screen-foot" id="register">
              Already registered? <Link to="/login">click here</Link> to log-in
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Sign;

 
