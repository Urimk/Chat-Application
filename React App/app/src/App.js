import './App.css';
import LeftBar from './components/LeftBar.js';
import ContactsBar from './components/ContactsBar.js';
import ChatBox from './components/ChatBox.js';

function App() {
  return (
    <>
      <div id="background"></div>
      <LeftBar />
      <ContactsBar />
      <ChatBox />
    </>
  );
}

export default App;
