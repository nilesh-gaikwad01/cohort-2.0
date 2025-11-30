
const {Admin} = require("../db/index");
const mongoose = require("mongoose");

// Implement the logic of the admin middleware
// You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
// we can easily use the async await function rather than normal function


 function adminMiddleware(req, res, next){
    const username = req.headers.username;
    const password = req.headers.password;

    Admin.findOne({
        username: username,
        password : password
    }) 
    .then (function(value){ 
        if(value){
            next();
        } else {
            res.status(403).json({
                msg : "Admin does not exist"
            })
        }
    })
    }

module.exports = adminMiddleware;

