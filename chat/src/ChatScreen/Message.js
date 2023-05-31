function Message({ text, time, incoming }) {
    const messageClass = incoming ? "message incoming_message" : "message user_message";
    const messageTineClass = incoming ? "message_time" : "message_time_user";

    return (
      <div className="msg_and_time">
        <div className={messageClass}>
          <p>{text}</p>
        </div>
        <span className={messageTineClass}>{time}</span>
      </div>
    );
  }
  
  export default Message;
  