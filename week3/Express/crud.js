

// CRUD Operation in Temporary Database

const express = require("express");

const app = express();

app.use(express.json());


let users = [ 
{id : 1,  name:"First Candidate", age : 14},
{id : 2,  name:"Second Candidate", age : 20},
{id : 3,  name:"Third Candidate", age : 22}
];
// console.log(users);


app.post("/users", (req, res) => {

  const newUser = req.body;
  newUser.id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

  console.log(newUser)


  users.push(newUser);
  res.status(201).json(newUser)
})

app.put("/users/:id", (req,res) => {
  const userID = parseInt(req.params.id);
  updatedData = req.body;

  const userIndex = users.findIndex(user => user.id === userID);

  if(userIndex !== -1 ){
    users[userIndex] = {...users[userIndex], ...updatedData}
    res.json(users[userIndex]);
    
  }else{
    res.status(404).send("user not found")
  }
});


app.delete("/user/:id", function(req,res){
  const userID = parseInt(req.params.id);

  const initialLength = users.length;

  users = users.filter(user => user.id !== userID)
  if(users.length < initialLength){

  }else{
    res.status(404).send("User not found")
  }
});


app.get("/",(req,res) => {
  //  res.send("Hello");
   res.json(users);

})

app.listen(5005, () =>{
  console.log("Server running at http://localhost:5005");

})


// Hospital Management database 






