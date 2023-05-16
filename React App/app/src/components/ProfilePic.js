function ProfilePic({ pic }) {
    return (
        <div class="pic_and_status">
            <img className="profile_pic" src={ pic }></img>
            <div className="online_sign"></div> 
        </div>
    );
}

export default ProfilePic;