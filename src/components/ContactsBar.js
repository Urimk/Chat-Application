import Search from "./Search"
import Contact from "./Contact"

function ContactsBar() {
    return (
        <div id="chats_bar">
            <div id="chat_bar_line1">
                <span id="chats_title">Messages</span>
                <span id="msgs_number">(3)</span>
                <span id="more_icon">+</span>
            </div>
            <Search />
            <div id="chats">

            </div>
        </div>
    )
}

export default ContactsBar;