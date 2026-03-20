import React from "react";


function Input(props){

    return(
        <input id={props.id} onChange={props.onChange} className={props.className} type={props.type} required placeholder={props.placeholder}/>
    )
}

export default Input;


