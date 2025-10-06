// what is Global catches middleware


// - It is the error Handling middleware
// - Someone can Read your exception or error inside the server thats why it use
// -  It take Four input means err, req, res, next 



 const express = require("express");
 const app = express();
 
 app.use(express.json());

 // post request data handle

 app.post("/health-checkup", (req, res) => {
   
   // kidney array as a input [1,2]
    const kidneys = req.body.kidneys;
    const kidneyLength = kidneys.length;
    res.send("You have" +kidneyLength + "kidneys");
 });

// use middleware

 app.use( function(err, req, res, next){
   res.json({
      msg : "something wents wromg with your server"
   });
 });


 app.listen(6000, function(){
   console.log( " server live at http://localhost:6000/health-checkup");
   
 })