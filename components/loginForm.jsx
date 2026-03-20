import React, { useState } from "react";
import Input from "./inpt";
import {Eye, EyeOff} from "lucide-react"
import details from "./location";

function LoginForm(){

    const [view_password, setView] = useState("password");
    const [pagetype, setpagetype] = useState("login");

    const [user_email, set_user_email] = useState("")
    const [user_password, set_user_password] = useState("")
    const [verify_user_password, set_verify_user_password] = useState("")
    const [error, setError] = useState("")
    const [buttonType, setButtonType] = useState("button");

    async function register(){
        setError("")
        if (!user_email || !user_password) return setError("All fields are required.")
        if (user_password !== verify_user_password) return setError("Passwords do not match.")

        try {
            const response = await fetch(details.signupUrl, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({user_email, user_password, verify_user_password})
            })
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Registration failed.")
            console.log(data.message)
        } catch(err) {
            setError(err.message)
        }
    }

    async function logon(){
        setError("")
        if (!user_email || !user_password) return setError("All fields are required.")

        try {
            const response = await fetch(details.loginUrl, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({user_email, user_password})
            })
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Login failed.")
            console.log(data.message)
        } catch(err) {
            setError(err.message)
        }
    }

    function view_password_function(){
        if(view_password === "password"){
            setView("text")
        }else{
            setView("password")
        }
    }

    function change(){
        if (pagetype === "login"){
            setpagetype("Sign Up")
        }else{
            setpagetype("login")
        }
    }

    const labelStyle = {
        color: "white",
        fontSize: "12px",
        alignSelf: "flex-start",
    }

    return(
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <h1>Crytoconnect</h1>
            <p>Admin Portal {pagetype}</p>
            <hr style={{width:"100%"}}/>
            {error && <p style={{color: "red", fontSize: "12px"}}>{error}</p>}

            <label htmlFor="email" style={labelStyle}>Email</label>
            <Input onChange={(e)=>{set_user_email(e.target.value)}} id="email" className="email" type="email" placeholder="user@gmail.com" />

            <label htmlFor="password" style={labelStyle}>Password</label>

            {pagetype === "login" ? 
                <>
                    <div style={{position:"relative", width:"100%"}}>
                        <Input onChange={(e)=>{set_user_password(e.target.value)}} id="password" className="password" type={view_password} placeholder="cryptoconnect-password"/>
                        {view_password === "password" ?
                            <Eye onClick={view_password_function} style={{position:"absolute", top:"50%", right:"10px", transform:"translateY(-50%)", height:"18px", cursor:"pointer"}}/>
                            :
                            <EyeOff onClick={view_password_function} style={{position:"absolute", top:"50%", right:"10px", transform:"translateY(-50%)", height:"18px", cursor:"pointer"}}/>
                        }
                    </div>
                    <button onClick={logon} className="submit" type={buttonType}>Access Portal</button>
 
                    <p style={{marginTop:"20px"}}>Dont have an account?
                        <span onClick={change} style={{textDecoration:"underline", cursor:"pointer", marginLeft:"6px"}}>
                            Sign Up
                        </span>
                    </p>
                </>
                :
                <>
                    <Input onChange={(e)=>{set_user_password(e.target.value)}} id="password" className="password" type="password" placeholder="cryptoconnect-password"/>
                    <label htmlFor="verify-password" style={labelStyle}>Verify Password</label>
                    <Input onChange={(e)=>{set_verify_user_password(e.target.value)}} id="verify-password" type="password" className="verify-password" placeholder="verify password"/>
                    <button onClick={register} className="submit" type={buttonType}>Register</button>
                    <p style={{marginTop:"20px"}}>Have an account?
                        <span onClick={change} style={{textDecoration:"underline", cursor:"pointer", marginLeft:"6px"}}>
                            Login
                        </span>
                    </p>
                </>
            }
        </div>
    )
}

export default LoginForm;