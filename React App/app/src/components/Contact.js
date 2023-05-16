import ProfilePic from "./ProfilePic";

function Contact({ username }) {
    const currentTime = new Date().toLocaleString();

    return (
      <div className="chat_preview">
        <ProfilePic pic="profile_pics/NO_PIC.png"/>
        <span className="username">{username}</span>
        <span className="timestamp">{currentTime}</span>
        <span className="msg_preview new_message">You have no messeges with this contact.</span>
      </div>
    );
  }
  
  export default Contact;