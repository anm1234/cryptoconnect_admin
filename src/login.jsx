import React from "react";

function Createinput(props){
    return (
            <div>
                <input 
                    className={props.className} 
                    type={props.type}
                    placeholder={props.placeholder}
                    required
                />
            </div>      
    );
}

function Form(){
    return(
        <div id="login">
            <form method="POST" action="/login">
                <h2>Admin Portal</h2>
                <hr/>
                <Createinput className="email" type="email" placeholder="Enter your Email"/>
                <Createinput className="password" type="password" placeholder="Enter your password"/>
                <Createinput className="submit" type="submit" placeholder="Enter your password"/>
            </form>
        </div>

    );
}

export default Form;


