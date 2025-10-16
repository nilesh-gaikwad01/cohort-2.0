# Middlewares


##  What are the middlewares


- Middlewares are the functions that runs between the request (client) and response (server)
- it written in the middle of the request and response
- Each middleware can read, modify and block the request before sending.


- e.g It acts like the security check in airprt
-  (First Guard check your ID - Middleware 1
-  Second Scan Your bags - Middleware 2
- If Everthig is okay then, You board the flight -> route handeler)

- it has three arguments (res, req, next)

1. `req` - request object (contains info. Like URL, body, header)
2. `res` - response object ( used to send the data back to the client)
3. `next()`- tells Express to move to the nexy middleware/route

```js 
const express = require("express"); 

const app = express(); 

app.post("/", req, res, next ){
    //your code logic
    next() 
}
app.listen(3000, () => console.log("Server running at the port 3000"));

```



## Types of Middlewares

 1. Appliaction level medelware like : appliese to the whole app using  `app.use()`,`app.METHOD()`

 2. Route level middleware : appliese only to the specific routes `routers.use()`

 3. Built in middleware : nstall via npm like body-pasrser,cors,morgan `express.json()`,`express.static()`

 4. Error Handling middleware : It handle the erro using `(err, req, res, next)`

 5. Third-party middleware : 
 `morgan` - It Logs all requests in the console
 `cors`   - Required when frontend and backend are hosted on different domains.
 `helmet` - secure express app by setting various HTTP headers
 `cookie-parser` - Use for reading and setting (cookies, tokens)
 `express-session` - Creates and manages sessions on the server means store user login data between request
 `body-parser` -  Older package for parsing the incoming req.body and now it build into `express.json`,`express.urlencoded()`

  Use of Third party middleware need to install throgh npm like
   `npm install helmet` javascript require 
   `const helmet = require("helmet");` use it into
   `app.use(helmet());`

 
 > ### Note : body-parser is the  Older package for parsing the incoming req.body     and now it build into the express.json,
 > ### Note : we can add the custom Middleware  and use it

 ```js
 const  logTime = (req, res, next) => {
    console.log(`Request at : ${new Date ()}`);
    next() // call to the next middleware
 };

 app.use(logTime);

 app.get("/", (res,res) =>{
    res.json({
        msg: "hello"
    });
 });

```

## Middleware Examples :

- Logging: Track incoming requests.
- Authentication: Check if user is logged in before accessing routes.
- Validation: Ensure form data is correct before saving.
- Error Handling: Catch and handle errors in one place.
- Serving Static Files: Deliver HTML, CSS, JS files to frontend.







