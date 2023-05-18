import ProfilePic from "./ProfilePic";

function Contact () {
    return (
        <div className="chat_preview">
            <ProfilePic />
            <span className="username">Luigi Mario</span>
            <span className="timestamp">28/04/23 | 14:27:31 PM</span>
            <span className="msg_preview new_message">Mamamia!!!</span>
        </div>
    );
}

export default Contact;