import LeftBarButtons from "./LeftBarButtons.js";
import ProfilePic from "./ProfilePic.js";

function LeftBar(user) {
    return (
        <div id="side_bar">
            <ProfilePic pic={user.picture} online = { 1 }/>
            <p id="username">{user.name || "NO_NAME"}</p> 
            <div className="seperator"></div> 
            <LeftBarButtons />
        </div>
    );
}

export default LeftBar;