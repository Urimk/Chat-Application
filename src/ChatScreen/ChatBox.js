import ProfilePic from "./ProfilePic";
import ChatButtons from "./ChatButtons.js";
import Message from "./Messege.js";
import SendMessege from "./SendMessege.js";

function ChatBox () {
    return (
        <div id="chat_window">
                <ProfilePic />
                <span className="username"></span>
                <span id="online_status"></span>
                <ChatButtons />
                <div id="messages">
                </div>
                <SendMessege />
        </div>
    );
}

export default ChatBox;