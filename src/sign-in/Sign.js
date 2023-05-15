import Display from "./displayName/Display"
import Password from "./password/Password"
import Register from "./foot-screen/Register"
import Image from "./image/Image"
import {Username} from "./userName/Username"

function Sign(){
    return(
        <body>
    {//--background like sea--
    }
    <div className="patterns sea"></div>
   <form>
    <div className="container-fluid" id="log-screen">
           {
            //--Username lable--
            <Username />
           } 
           {
//--password lable--
    }
        <Password/>

        {
      //--Display Name lable--
    }
        
        <Display/>
          { 
        //image
          }
           <Image/>

           <Register/>
    
    </div>
   </form>
</body>
        )
}
export default Sign 

{
    /**
     * 
        
    
    
       
    {
      //--register button--
    }
        
        <Register/>
     */
}