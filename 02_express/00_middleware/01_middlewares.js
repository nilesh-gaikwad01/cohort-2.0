// Use Of  middlewares 
 

const express = require('express');
const app = express();
app.use(express.json());



// Q.1 count the number of requests

let count = 0 ;

function countRequest(req, res, next){
    count++;
    console.log(`Request count is ${count}`);

    next();
}

// console.log(count);

app.use(countRequest);
console.log('Middleware registered successfully!');

app.get("/about", (req, res ) => (res.send(`Now the count ${count}`) ));


// Q.2 Blocked the access without API keys

function checkAPI (req, res, next){
    if(req.query.key === "123"){
        // allow user 
        console.log(req.query.key);
        next();
    }else{
        res.status(403).send(" Access denied invalied Api id")
    }
}
app.get("/secure", checkAPI, (req, res, next) => (res.send("Data is Secured")));


// Q.3 Add custopme property route means middleware use before the route


function addUser(req, res, next ){
    req.username = "Nilesh";
    next();
}

app.get("/addUser", addUser, (req, res) => {
    res.send(`Hello ${req.username}`);
    console.log("object and Keys : ", Object.keys(req));
    console.log({
        username : req.username,
    });

});

// Q.4  Block Ip 

function blockIp (req, res, next ){
    const blockedIp = "fe80::e29f:::8b4e%18" // IPV6 Route
     if(blockIp === blockedIp){
        send.status(403).send("Your IP is Blocked")
     }

     next();
}

app.get("/ipcheck", blockIp, (req, res) => {
    res.send("hello")
})

// Q.5  Hospital Management system 

app.get("/health-checkup", (req, res) => {

    const kidneyId = parseInt(req.query.kidneyId);
    const username = req.headers.username;
    const password = req.headers.password;

    console.log(kidneyId);

    if( username != "kirat" || password != "pass"){
        res.status(400).json({
                "msg" : "user does not exist"
            }
        );
         return ;
    };

    if( kidneyId != 1 && kidneyId != 2){
    res.status(400).json({
        msg : " wrong input"
    });
     return ;
};

res.json({
    msg : "your kedney is fine"
})
   
});

app.listen(2000,() => {
    console.log( "server running at http://localhost:2000/health-checkup");
    
} )

