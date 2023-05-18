import "./App.css"
import LeftBar from './ChatScreen/LeftBar.js';
import ContactsBar from './ChatScreen/ContactsBar.js';
import ChatBox from './ChatScreen/ChatBox.js';

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