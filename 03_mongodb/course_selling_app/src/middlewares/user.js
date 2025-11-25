// Middlewares for handling the auth


function userMiddleware(req, res, next){
    const username = req.body.username;
    const password = req.body.password;

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
