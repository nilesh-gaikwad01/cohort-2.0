
## Zod 

[zod_documentation :](https://zod.dev/) 

  Zod is a TypeScript-first schema validation library that helps developers ensure that data has a predictable and correct structure at runtime. In simple terms, it's a tool for defining the shape of your data and then checking if any given piece of data actually matches that shape.

   ```bash 
  npm install zod 
  ```
  ``` const zod = require("zod"); ```


### How zod works ?

  1. Define a schema : You use zod to define the shape of your data.specifying types of your data like string, booleans, object and arrays
   
  2. Validate Data :You can use the method like parse or safeparse to check if incoming data confirms to your defined schema

  3. Infer Types : 


### Key Features 

- **TypeScript-First:** Designed to work seamlessly with TypeScript for strong type checking.
  
- **Runtime Validation:** Provides robust validation for data received at runtime. 
  
- **Type Inference:** Automatically generates TypeScript types from schemas, which is a major advantage for development. 

- **Extensive API:** Offers methods for defining various data types, validating complex nested structures, and supporting functions like extend, merge, and pick for object schemas. 

- **Zero Dependencies:** A lightweight library that does not depend on other packages. 

- **Cross-Environment Compatibility:** Can be used in various environments, including web browsers and Node.js. 


### Zod Data Types

 `z.string()` --> Requires text string `i.e "Hello"`
 
 `z.number()` --> Requires Numberic value `i.e 43`

 `z.boolean()` --> Requires boolean value ` i.e true/false`

 `z.array()` -->  It require array of item `[1,2,3]`

 `z.object()` --> It requires object  `{ Admin : "User"}`

 `z.eum()` --> fixed allowed value `{"Admin""User" }`

 `z.date` --> It Usases Date object  `new Date()` 

 `z.nullable` -->Allow null value `null allowed`

 `z.option` --> Optional Field `Property may be missing` 

```js 

// Simple function and zod schema validation

// {
//     email : string => email
//    password : atleast 8 charector,
// }

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


```

### zod schema Validation in express

```js

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

```

### What is Transformations & coercion in Zod

In Zod, coercion is the automatic conversion of an input value from one type to another (e.g., a string to a number), while transformation is a more general term for any data manipulation, which can include coercion or custom logic applied after validation. Coercion uses built-in JavaScript methods like Number() or String(), and z.coerce is used for this purpose. Transformations are applied using methods like .transform() to run custom functions after a value has been successfully validated. 

`Coercion`

- **What it is:**  A specific type of transformation that automatically converts a value to the expected type. 
- **How it works:** It uses JavaScript's built-in functions, such as String(), Number(), and Boolean(), to attempt the conversion. 
-**When to use:** Ideal for handling external data like URL parameters or form inputs, where values are often strings that need to be converted to other types (like numbers or booleans)

```js
    import { z } from "zod";

    const schema = z.coerce.number(); // Coerces input to a number

    schema.parse("42"); // Returns 42 (number)
    schema.parse(true); // Returns 1 (number)
    schema.parse("abc"); // Throws an error 

```

`Transformation`

- What it is: A broader concept for manipulating data, which includes coercion but also allows for custom functions to run after validation. 

- How it works: You use the .transform() method to apply a custom function to a value that has already passed validation. 

- When to use: Use it for complex data manipulation that isn't handled by built-in coercion, such as formatting a date or restructuring an object. 

```js

// example 

    import { z } from "zod";

    const schema = z
      .object({
        date: z.string(),
      })
      .transform((obj) => ({
        ...obj,
        date: new Date(obj.date), // Custom transformation to convert string to a Date object
      }));

    schema.parse({ date: "2023-10-27" }); // Returns { date: Date object }


    ```