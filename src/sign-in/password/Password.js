import { useRef, useState } from "react";

function Password() {
  const pass1Ref = useRef(null);
  const pass2Ref = useRef(null);
  const [isValid, setIsValid] = useState(true);
  const [isLong, setIsLong] = useState(true);

  //check that the password is longer than 5 letters
  const checkLength = () => {
    const pass1 = pass1Ref.current.value;
    const isLong = pass1.length > 6;
    setIsLong(isLong);
  };


  //check that the password validation is equal to the original password
  const checkValid = () => {
    const pass1 = pass1Ref.current.value;
    const pass2 = pass2Ref.current.value;
    const isValid = pass1 === pass2;
    setIsValid(isValid);
  };

  return (
    <>
    {!isLong && (
        <div className="lable alert alert-danger">
          The password is shorter than 6 letters
        </div>
      )}
      <div class="container  lable">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">
              Password
            </span>
          </div>
          <input
            ref={pass1Ref}
            onKeyUp={() => {
                checkLength();
              }}
            type="password"
            class="form-control"
            aria-label="password"
            aria-describedby="basic-addon1"
          ></input>
        </div>
      </div>
      {isLong && !isValid && (
        <div className="lable alert alert-danger">
          The verification have no match
        </div>
      )}
      <div class="container  lable">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">
              Password Verification
            </span>
          </div>
          <input
            ref={pass2Ref}
            onKeyUp={() => {
              checkValid();
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

export default Password;
 