import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PasswordLog from './password/PasswordLog';
import UsernameLog from './userName/UsernameLog';
function LogIn({users , setUsers, setUser}) {
    const navigate = useNavigate();
    const [isNameReady, setIsNameReady] = useState(null);
    const [isCorrect, setIsCorrect] = useState(true);
    const [isPasswordReady, setIsPasswordReady] = useState(null);
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);

    function handleSubmit(event) {
      event.preventDefault();
      let index = 0;
      let find = false;
      // Check if the username and password match
      for (; index < users.length; index++) {
        if (users[index].userName === name && users[index].password === password) {
          find = true;
          break;
        }
      }
      if (find) {
        const updatedUsers = users.map((user, i) =>
          i === index ? { ...user, registered: "yes" } : user
        );
        setUsers(updatedUsers); // Update the users array in the parent component
        setUser(users[index])
        console.log(users[index])
        navigate('/chat');
      } else {
        setIsCorrect(false);
      }
    }
      
    return (
        <div>
            {
        //<!--background like sea-->
        }
        <div className="patterns sea"></div>
        <form onSubmit={handleSubmit}>
{
            //<!--the log in screen-->
            }
            <div className="container-fluid" id="log-screen">
                    {
                    //<!--Username lable-->
}
                <UsernameLog users={users} setIsReady={setIsNameReady} setVal={setName} />
    {
                //<!--password lable-->
    }
                <PasswordLog name={name} setIsReady={setIsPasswordReady} setVal={setPassword} users={users} />
                {
                    !isCorrect &&(
                        <div className="lable alert alert-danger">
                            Incorrect username or password
                </div>
                    )
                }
    {
                //<!--login botton-->
    }
                <button type="submit" className="btn btn-primary screen-foot" id="login">Login</button>
               {
                //<!--link to register-->
               }
            <span className="screen-foot" id="register">Not registered? <Link to="/">click here</Link> to register</span>
            </div>
        </form>
    </div>
    );
  }
  
  export default LogIn;