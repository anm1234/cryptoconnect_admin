import express from "express";
import session from "express-session"
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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


app.get("/", (req, res) => {
});

app.post("login",(req,res)=>{
  console.log("User is on the login page");
  console.log(req.body);
  res.json({"check":true})
})

app.listen(3000,()=>{
  console.log("Server is up");

});