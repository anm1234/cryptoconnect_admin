import React from "react";
import ReactDom from "react-dom/client";
import Form from "./login.jsx";
import "./style.css";




ReactDom.createRoot(document.getElementById("root")).render(
   <Form/>
);

const form_submission = document.querySelector(".submit");

form_submission.addEventListener("submit",async()=>{
   const user_email = loginForm.querySelector(".user_email").value;
   const user_pass  = loginForm.querySelector(".user_password").value;
   alert("form has been cliecked");

   const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_email, user_pass })
   });

   const data = await res.json();
   user_email.value = "";
   user_pass.value = "";
});

