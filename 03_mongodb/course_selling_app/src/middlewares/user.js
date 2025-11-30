const  { User } = require("../db/index")

const mongoose = require("mongoose");

// Middlewares for handling the 

function userMiddleware(req, res, next){
    const username = req.headers.username;
    const password = req.headers.password;

    User.findOne({
        username : username,
        password : password
    })
    .then(function (value){
        if (value){
            next(); // next to the function i.e routes
        }else{
            res.status(403).json({
                msg : "User doent exiest"
            })
        }
    })
}

module.exports = userMiddleware;
