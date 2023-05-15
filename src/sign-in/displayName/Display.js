import { useRef, useState } from "react";
import users from "../UserDataBase.json"

function Display(){
    const [isNameExist, setIsNameExist] = useState(false);
    const nameRef = useRef(null);

     //check the no other user uses this username
  const checkOtherUserNames = () => {
    const currentUsers = users.users;
    const inputName = nameRef.current.value;
    if (currentUsers.length !== 0) {
      for (let i = 0; i < currentUsers.length; i++) {
        if (currentUsers[i].display === inputName) {
          setIsNameExist(true);
          return;
        }
      }
    }
  
    setIsNameExist(false);
  };
    return(
        <div className="lable">
            <div className="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Display Name</span>
                </div>
                {isNameExist && (
          <div className="lable alert alert-danger">
            This displayName already exists, please pick another one
          </div>
        )}
                <input
                ref={nameRef}
                onKeyUp={() => {
                  checkOtherUserNames();
                }}
                type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1"></input>
            </div>
        </div>
        
        )
}
export default Display;