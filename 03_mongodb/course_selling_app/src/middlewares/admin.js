
// Implement the logic of the admin middleware
// You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

 function adminMiddleware(res, req, next){
    const username = req.body.username;
    const password = req.body.password;

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

