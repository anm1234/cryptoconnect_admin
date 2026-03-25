import express from "express";
import session from "express-session"
import cors from "cors"
import { createClient } from '@supabase/supabase-js'
import dotenv from "dotenv";
dotenv.config();



const app = express();
const PORT = 3000;

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


const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

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

app.get("/users", async(req,res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('users')
        .select('id,password,fname,balance,lname,email');

      if (error) {
        console.error("Supabase error:", error);
        return res.status(500).json({ error: error.message });
      }

      const mapped = {};
      for (let i = 0; i < data.length; i++) {
        mapped[i] = {
          id: data[i].id,
          password: data[i].password,
          fname: data[i].fname,
          lname: data[i].lname,
          balance: data[i].balance,
          email: data[i].email,
        };
      }

      console.log(mapped);
      res.json(mapped);
      console.log("User details sent");
    } else {
      res.status(500).json({ error: "Supabase not initialized" });
    }
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/transactions", async(req,res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('Transactions')
        .select(`transaction_id,
          user_id,
          coin,
          amount,
          price,
          transaction_type`);

      if (error) {
        console.error("Supabase error:", error);
        return res.status(500).json({ error: error.message });
      }

      const mapped = {};
      for (let i = 0; i < data.length; i++) {
        mapped[i] = {
          transaction_id: data[i].transaction_id,
          user_id: data[i].user_id,
          coin: data[i].coin,
          amount: data[i].amount,
          price: data[i].price,
          transaction_type: data[i].transaction_type,
        };
      }

      console.log(mapped);
      res.json(mapped);
      console.log("Transaction details sent");
    } else {
      res.status(500).json({ error: "Supabase not initialized" });
    }
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/holdings", async(req,res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('Holding')
        .select('asset_id, user_id, asset_name, asset_amount');

      if (error) {
        console.error("Supabase error:", error);
        return res.status(500).json({ error: error.message });
      }

      const mapped = {};
      for (let i = 0; i < data.length; i++) {
        mapped[i] = {
          asset_id: data[i].asset_id,
          user_id: data[i].user_id,
          asset_name: data[i].asset_name,
          asset_amount: data[i].asset_amount,
        };
      }

      console.log(mapped);
      res.json(mapped);
      console.log("Holdings details sent");
    } else {
      res.status(500).json({ error: "Supabase not initialized" });
    }
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.listen(PORT,()=>{
  console.log(`Server is love on port ${3000}`)
})