
User = require('../models/users.js')

const createUser = async (username, password, displayName, profilePic) => {
    const user = new User({
      username: username,
      password: password,
      displayName: displayName,
      profilePic: profilePic,
    });
    return await user.save();
  };
  
  const getUserByUserName = async (username) => {
    const user = await User.findOne({ username: username });
    if (!user) {
      return null;
    }
    return {
      username: user.username,
      displayName: user.displayName,
      profilePic: user.profilePic,
    };
  };

const checkUser = async(username,password) => {
    let user = await User.findOne({username: username, password: password});
    if(user == {})
        return false
    return true
}



module.exports = {createUser, getUserByUserName, checkUser};
