import LeftBarButtons from "./LeftBarButtons.js";
import ProfilePic from "./ProfilePic.js";

function LeftBar() {
    return (
        <>
            <ProfilePic />
            <p id="username">Mario M.</p> 
            <div class="seperator"></div> 
            <LeftBarButtons />
        </>
    );
}

export default LeftBar;