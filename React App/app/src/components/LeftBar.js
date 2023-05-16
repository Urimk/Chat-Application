import LeftBarButtons from "./LeftBarButtons.js";
import ProfilePic from "./ProfilePic.js";

function LeftBar() {
    return (
        <div id="side_bar">
            <ProfilePic pic="profile_pics/NO_PIC.png" online = { 1 }/>
            <p id="username"></p> 
            <div className="seperator"></div> 
            <LeftBarButtons />
        </div>
    );
}

export default LeftBar;