import Search from "./Search"
import Contact from "./Contact"

function ContactsBar() {
    return (
        <>
            <div id="chat_bar_line1">
                <span id="chats_title">Messages</span>
                <span id="msgs_number">(3)</span>
                <span id="more_icon">+</span>
            </div>
            <Search />
            <div id="pinned_title">
                <span id="pinned_text">Pinned Conversations</span>
                <span id="dots">...</span>
            </div>
            <div id="pinned_chats">
                <Contact />
            </div>
            <span id="all_text">All</span>
            <div id="chats">
                <Contact />
                <Contact />
            </div>
        </>
    )
}