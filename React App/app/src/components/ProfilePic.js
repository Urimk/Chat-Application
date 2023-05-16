function ProfilePic({ pic, online }) {
    return (
      <div className="pic_and_status">
        <img className="profile_pic" src={pic} />
        <div className={online ? "online_sign" : "online_sign_off"}></div>
      </div>
    );
  }
  
  export default ProfilePic;
  