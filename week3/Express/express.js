


// create http sever with express

const express = require("express");
const app = express();

app.use(express.json());

// First route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

Post

app.post("/user", (req, res) => {
    const {name, age} = req.body;
    res.json({message :`User ${name} is ${age} year old`})
});

app.post("/contact", (req, res) => {
  res.send("Contact form submitted")
});

app.put ("/user/:id", (req, res) => {
  const updatedData = req.body
  console.log(updatedData);
  
  res.send(`User with Id ${req.params.id} Updated`)
}); 

app.delete("user/:id", (req, res) => {
  res.send(`User with Id ${req.params.id} deleted`)
});

app.listen(3003, () => {
  console.log("Server running at http://localhost:3003");
});