import React from "react";
import "./style.css";

function Input(props){
    return(
        <input className={props.className} type={props.type} required placeholder={props.placeholder}/>
    )
}

export default Input;


