// simple function uses require zod module 

// Write the function and use zod for Input schema validation


const zod = require("zod");

function validateInput (obj){
    const schema = zod.object({
        email : zod.string().email(),
        password : zod.string().min(8)
    
    
    })

    const Response = schema.safeParse(obj);

    console.log(Response);

}

validateInput({
    email : "nilesh@gmail.com",
    password : "skdffffdhdf"
})


