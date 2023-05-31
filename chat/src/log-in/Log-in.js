import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PasswordLog from './password/PasswordLog';
import UsernameLog from './userName/UsernameLog';
function LogIn({users , setUsers, setUser}) {
    const navigate = useNavigate();
    const [isCorrect, setIsCorrect] = useState(true);
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);

    function handleSubmit(event) {
      event.preventDefault();
      const userDetiles = {
        "userName": name,
        "password": password,
      };
      const res = await fetch('http://localhost:5000/api/Tokens', {
        'method': 'post', // send a post request
        'headers': {
        'Content-Type': 'application/json', // the data (username/password) is in the form of a JSON object
        },
        'body': JSON.stringify(userDetiles) // The actual data (username/password)
        }
        )
        // The server's response is a json object
        const json = await res.json()
        if (res.status != 200)
        setIsCorrect(false);
        else {
        // Correct username/password
        // Take the token the server sent us
        // and make *another* request to the homepage
        // but attach the token to the request
        const res = await fetch('http://localhost:89/', {
        'headers': {
        'Content-Type': 'application/json',
        'authorization': 'bearer ' + json.token // attach the token
        },
      // Check if the username and password match
      if (find) {
        const updatedUsers = users.map((user, i) =>
          i === index ? { ...user, registered: "yes" } : user
        );
        setUsers(updatedUsers); // Update the users array in the parent component
        setUser(users[index])
        navigate('/chat');
      }
    }
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