const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "12345"

const app = express();
app.use(express.json());


// create In memory Database

const All_Users = [
      {
    username : "hitesh_Chaudhari",
    password : "123",
    email : "Hiesh@123.com"
},
  {
    username : "kirat_singh",
    password : "1234",
    email : "kirat@123.com"
},
  {
    username : "striver_dsa",
    password : "12345",
    email : "striver@123.com"
}
]

 function userExists (username, password){
    // logic code here to return true or false if this user exists
    // in All_user array

    userFound = false;

    for(let i = 0; i < All_Users.length ; i++){
        if (All_Users[i].username == username && All_Users[i].password == password) {
            
            userFound = true;
             break;
        }

    }
     return userFound; // function return user is already exiest
}

app.post("/signIn", (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;

    if (!userExists(username, password)){
       return res.status(403).json({
            msg : "User is not exist in memory db"
        })
    }

    const token = jwt.sign({username : username}, jwtPassword);
    return res.json({
        token,
    })

});

app.get("/users", function (req, res){
    const token = req.headers.authorization;
    try{
        const decoded = jwt.verify(token ,jwtPassword);
        const username = decoded.username;

        // It creates a new array excluding logged in user.

        const otherUsers = All_Users.filter(u =>u.username !== username);
        return res.json(otherUsers);

    }catch(err) {
        return res.status(403).json({
            msg : "invalid token"
        });
    }

});

app.get("/", function(req, res){
    res.send("Hello message form Backend");
})


app.listen(6060, function (){
    console.log("Server is running on the Port : http://localhost:6060/")
})

