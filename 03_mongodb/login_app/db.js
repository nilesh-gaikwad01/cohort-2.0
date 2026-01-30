const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); 
const cors = require("cors");
const env = require('dotenv').config();



const app = express();
app.use(express.json());
app.use(cors());

const jwtPassword = "123456"
const PORT = 1020; 
// connect to the DB
 mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// Create User Schema

const userSchema = new mongoose.Schema({
    username : String,
    password:  String
});

// Create User model 

const User = mongoose.model("User" , userSchema); 

//New Registration routes

app.post("/signUp", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new User({username,password});
   await newUser.save(); // Save in the db

res.json({msg : "User is registred sucessfully"})

});

 app.post("/logIn", async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    //check if the user is already in db

const user = await User.findOne({username, password});

    if (!user) {
        return res.status(403).json({
            msg : "User is not found" 
        }) 
    }

    const token = jwt.sign({username: username}, jwtPassword);
    return res.json({
        token,
    })
 });

 app.get("/users", async (req, res) => {
    const token = req.headers.authorization;

    try {
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
        // return all users instead of logged in
        const users = await User.find({username :{$ne: username}})
        res.send(users);
    } catch (err) {
        return res.status(403).json({
            msg : "invalid token"
        });
        
    }
 });

 app.get("/", (req, res) => {
    res.send("Sucessfully Mongodb and server running ")
 });

 app.listen(PORT, () => {
    console.log("Server is running on the Port : http://localhost:1020/");
    
 })
