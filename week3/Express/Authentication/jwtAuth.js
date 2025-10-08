const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456"

const app = express();
app.use(express.json());


// create In memory Database

const All_Users = [
      {
    username : "hitesh_Chaudhari",
    password : "123",
},
  {
    username : "kirat_singh",
    password : "1234",
},
  {
    username : "striver_dsa",
    password : "12345",
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
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
    
      // return a list of users other than this username
      // Filter the All_Users array to remove the logged-in user
        const filteredUsers = All_Users.filter(user => user.username !== username);

        res.json({
        users : filteredUsers
    })

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

