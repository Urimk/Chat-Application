import { useRef, useState, useEffect } from "react";

function PasswordLog({ name,setIsReady, setVal, users }) {
  const passRef = useRef(null);
  function setPass(){
    setVal(passRef.current.value);
  }

  //check if this name exists or match to this password
  

  return (
    <>
      <div class="container  lable">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">
              Password
            </span>
          </div>
          <input
            ref={passRef}
            onKeyUp={() => {
              setPass();
            }}
            type="password"
            class="form-control"
            aria-label="password"
            aria-describedby="basic-addon1"
          ></input>
        </div>
      </div>
    </>
  );
}

export default PasswordLog;

 