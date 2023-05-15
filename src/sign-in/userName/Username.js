import { useRef, useState } from "react";
import users from "../UserDataBase.json"

//the final bottom
function Username() {
  //get the input
  const nameRef = useRef(null);
  //booleans objects, one for vildetion and one to search in other users
  const [isValid, setIsValid] = useState(true);
  const [isNameExist, setIsNameExist] = useState(false);

  //check that the name is longer than 7 and contains numbers, uper case and lower case
  const checkValid = () => {
    const name = nameRef.current.value;
    const hasUpperCase = /[A-Z]/.test(name);
    const hasLowerCase = /[a-z]/.test(name);
    const hasNumber = /[0-9]/.test(name);
    const isLongEnough = name.length >= 8;
    const isValid = hasUpperCase && hasLowerCase && hasNumber && isLongEnough;
    setIsValid(isValid);
  };

  //check the no other user uses this username
  const checkOtherUserNames = () => {
    const currentUsers = users.users;
    const inputName = nameRef.current.value;
    if (currentUsers.length !== 0) {
      for (let i = 0; i < currentUsers.length; i++) {
        if (currentUsers[i].userName === inputName) {
          setIsNameExist(true);
          return;
        }
      }
    }
  
    setIsNameExist(false);
  };
  


  return (
    <>
      <div className="label">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Username
            </span>
          </div>
          <input
            ref={nameRef}
            onKeyUp={() => {
              checkValid();
              checkOtherUserNames();
            }}
            type="text"
            className="form-control"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        {!isValid && (
          <div className="lable alert alert-danger">
            The username must be 8 letters long or above and must contain one upper case letter and one lower case letter
          </div>
        )}
        {isValid && isNameExist && (
          <div className="lable alert alert-danger">
            This username already exists, please pick another one
          </div>
        )}
      </div>
    </>
  );
}

export { Username };
