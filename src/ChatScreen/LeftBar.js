import LeftBarButtons from "./LeftBarButtons.js";
import ProfilePic from "./ProfilePic.js";

function LeftBar({ user, handleLogOut }) {

    return (
        <div id="side_bar">
            <ProfilePic pic={user.img} online = { 1 }/>
            <p id="username">{user.username || "NO_NAME"}</p> 
            <div className="seperator"></div> 
            <LeftBarButtons handleLogOut={handleLogOut}/>
        </div>
    );
}

export default LeftBar;