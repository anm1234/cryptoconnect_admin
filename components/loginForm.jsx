import React, { useState } from "react";
import Input from "./inpt";
import {Eye} from "lucide-react"





function LoginForm(){

    const [passview, setView] = useState(false);

    function passView(e){
        setView(!e)
    }

    return(
        <>
            <h1>Crytoconnect</h1>
            <p>Admin Portal Login</p>
            <hr/>
            <label for = "email" style={{color: "white", fontSize:"12px", marginLeft:"-300px"}}>Email</label>
            <Input id = "email" className="email" type="email" placeholder="user@gmail.com" />
            <label for = "email" style={{color: "white", fontSize:"12px", marginLeft:"-280px"}}>Password</label>
            <div style={{display:"flex"}}>
                <Input className="password" type="password" placeholder="cryptoconnect-password"/>
                 <Eye onClick={(e) =>{passView(e)}} style={{position: "absolute",top: "55%", right:"7%", height:"22px", cursor:"pointer"}}/>
            </div>
            <button className="submit" type="submit">Access Portal</button> 
            <p style={{marginTop:"20px"}}>Dont have an account<p style={{textDecorationLine:"underline"}}>Signup</p></p>
        </>
        
    )

}



export default LoginForm;