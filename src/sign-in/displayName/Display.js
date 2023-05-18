import { useRef, useState } from "react";

function Display({users,setIsReady,setVal}){
    const [isNameExist, setIsNameExist] = useState(false);
    const nameRef = useRef(null);

     //check the no other user uses this username
  const checkOtherUserNames = () => {
    const len = users.length;
    const inputName = nameRef.current.value;
    if (len !== 0) {
      for (let i = 0; i < len; i++) {
        if (users[i].display === inputName) {
          setIsNameExist(true);
          return;
        }
      }
    }
  
    setIsNameExist(false);
  };

  //check if ready to submit
  function isReady(){
    if(!isNameExist){
      setIsReady(true);
      setVal(nameRef.current.value);
    }else{
      setIsReady(false);
    }
  }

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
                  isReady();
                }}
                type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1"></input>
            </div>
        </div>
        
        )
}
export default Display;