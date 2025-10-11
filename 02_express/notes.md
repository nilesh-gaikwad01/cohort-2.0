#Middlewaares

``` What are the middlewares```


- Middlewares are the functions that runs between the request (client) and response (server)
- it written in the middle of the request and response
- Each middleware can read, modify and block the request before sending.


- e.g It acts like the security check in airprt
-  (First Guard check your ID - Middleware 1
-  Second Scan Your bags - Middleware 2
- If Everthig is okay then, You board the flight -> route handeler)

- it has three arguments (res, req, next)

1. req - request object (contains info. Like URL, body, header)
2. res - response object ( used to send the data back to the client)
3.  next()- tells Express to move to the nexy middleware/route


``` Types of Middlewares ```

 1. Appliaction level medelware like 
 - appliese to the whole app using app.use(), 

 2. Route level middleware
 - appliese only to the specific routes

 3. Built in middleware
 - install via npm like body-pasrser,cors,morgan

``` Middleware Examples ```

// Logging: Track incoming requests.
// Authentication: Check if user is logged in before accessing routes.
// Validation: Ensure form data is correct before saving.
// Error Handling: Catch and handle errors in one place.
// Serving Static Files: Deliver HTML, CSS, JS files to frontend.



```List of middlewares```






``` Zod ```
-
-
-
-
-



``` Dynamic authentication using the express ```

lecture  : 

- how to fech the server data to the frontend using the fetch API call
- write basic HTML page and function/asyns and await function to get the api data in frontend
- core thigs og crptography: hashing , Encrption, json web tockens, local storage


