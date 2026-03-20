import express from "express";
import session from "express-session"
import cors from "cors"
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 20   // 20 minutes
  }
}));

app.get("/",(()=>{
  console.log("User landed on get");
}))

app.post("/login", (req, res) => {
  console.log("User is on the login page");
  console.log(req.body);
  res.json({ authenticated: true, message: "Login successful" })
})

app.post("/signup", (req, res) => {
  console.log("User is on the signup page");
  console.log(req.body);
  res.json({ authenticated: true, message: "Registration successful" })
})

app.listen(3000,()=>{
  console.log("Server is up");

});