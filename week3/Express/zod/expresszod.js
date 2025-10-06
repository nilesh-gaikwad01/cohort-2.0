// Express with zod

const express = require("express");
const zod = require("zod");

const app = express ();
app.use(express.json());

// define the scehma for the validation check


// const schema = zod.array(zod.number) 

const schema = zod.object({
    email : zod.string(),
    password : zod.string().min(4),
    country : zod.literal("IN").or(zod.literal("US")),
    kidneys : zod.array(zod.number())
})

// {
//     email : string => email
//     password : atleast 8 charector,
 //    country  : "In" , "Us",
 //    age : zod.number().min(8)
// }

app.post("/login", function (req, res){

    const validate = req.body;
    const Response = schema.safeParse(validate);

    console.log(Response);
    

    if(!Response.success){
        res.status(411).json({
            msg : "input is not valid"
        })
    }else{
        res.send({
            Response
        })
    }
})

app.get("/login", (req, res) => {
    res.send("login page")

})

app.listen(3008, () => {
    console.log("server Started at the http://localhost:3008/login")
})