function ProfilePic({ pic }) {
    const noPic = "profile_pics/NO_PIC.png";
    console.log(pic);

    return (
      <div className="pic_and_status">
        <img className="profile_pic" src={pic || noPic} />
      </div>
    );
  }
  
  export default ProfilePic;
  