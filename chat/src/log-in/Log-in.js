import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PasswordLog from './password/PasswordLog.js';
import UsernameLog from './userName/UsernameLog.js';

function LogIn({setUser,setUsers}) {
    const navigate = useNavigate();
    const [isCorrect, setIsCorrect] = useState(true);
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);

    async function handleSubmit(event) {
      event.preventDefault();
      const userDetails = {
        "username": name,
        "password": password
      };
      const res = await fetch('http://localhost:12345/api/Tokens', {
        'method': 'post',
        'headers': {
          'Content-Type': 'application/json',
        },
        'body': JSON.stringify(userDetails)
      });
    
      if (res.status !== 200) {
        if(res.status === 401 || res.status === 403)
          alert("You have problem with your Token")
        else
          setIsCorrect(false);
      } else {
        
        const json = await res.json();
        let token = json.token;
          const respond = await fetch('http://localhost:12345/api/Users/' + userDetails.username, {
          'headers': {
          'Content-Type': 'application/json',
          'authorization': 'bearer ' + token
            },
          }
                  )
          const user = await respond.json()
          user.registered = "yes"
          user.token = json.token
          setUser(user);
          setUsers(prevUsers => [...prevUsers, user]);
          navigate('/chat');
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

                <UsernameLog setVal={setName} />
    {
                //<!--password lable-->
    }
                <PasswordLog setVal={setPassword}/>
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