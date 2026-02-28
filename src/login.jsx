import React from "react";
import Input from "./inpt";
import "./style.css";

var is_loggedin = false;

function LoginCheck() {
  if (is_loggedin) {
    return <h1>Hello Sir</h1>;
  } else {
    return (
      <form>
        <h1>Crytoconnect</h1>
        <p>Admin Portal</p>
        <hr/>
        <Input className="email" type="email" placeholder="Enter your email" /><br/>
        <Input className="password" type="password" placeholder="Enter your password" /><br/>
        <button className="submit" type="submit">Access Portal</button>
      </form>
    );
  }
}

function Form() {
  return (
    <div id="login">
      <LoginCheck />
    </div>
  );
}

export default Form;
