import { useEffect, useRef, useState } from "react";

//the final bottom
function Username({users,setIsReady,setVal}) {
  //get the input
  const nameRef = useRef(null);
  //booleans object, to search in other users
  const [isNameExist, setIsNameExist] = useState(false);

  //check the no other user uses this username
  const checkOtherUserNames = () => {
    const inputName = nameRef.current.value;
    let len = users.length;
    if (len !== 0) {
      for (let i = 0; i < len; i++) {
        if (users[i].userName === inputName) {
          setIsNameExist(true);
          return;
        }
      }
    }
  
    setIsNameExist(false);
  };

  //check if ready to submit
  const isReady = () => {
    const name = nameRef.current.value
    if(!isNameExist && name != ''){
      setIsReady(true);
      setVal(name);
    }else{
      setIsReady(false);
    }

  }
  


  return (
    <>
      <div className="lable">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Username
            </span>
          </div>
          <input
            ref={nameRef}
            onKeyUp={() => {
              checkOtherUserNames();
              isReady();
            }}
            type="text"
            className="form-control"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        {isNameExist && (
          <div className="lable alert alert-danger">
            This username already exists, please pick another one
          </div>
        )}
      </div>
    </>
  );
}

export default Username;
