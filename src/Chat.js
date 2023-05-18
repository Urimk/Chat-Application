import "./App.css"
import LeftBar from './components/LeftBar.js';
import ContactsBar from './components/ContactsBar.js';
import ChatBox from './components/ChatBox.js';

function Chat() {
  return (
    <>
      <div id="background"></div>
      <LeftBar />
      <ContactsBar />
      <ChatBox />
    </>
  );
}

export default Chat;