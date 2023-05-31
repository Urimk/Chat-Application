function ProfilePic({ pic, online }) {
    const noPic = "profile_pics/NO_PIC.png";
  
    return (
      <div className="pic_and_status">
        <img className="profile_pic" src={pic || noPic} />
        <div className={online ? "online_sign" : "online_sign_off"}></div>
      </div>
    );
  }
  
  export default ProfilePic;
  