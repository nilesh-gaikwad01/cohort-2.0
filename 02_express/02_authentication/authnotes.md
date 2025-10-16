
## Dynamic authentication using the express

lecture  : 

- how to fech the server data to the frontend using the fetch API call
- write basic HTML page and function/asyns and await function to get the api data in frontend
- core thigs of crptography: 
  `hashing `
  `Encrption`
  `json webtokens `
  `local storage`

- what is dynamic authentication in backend
- Using the jwt token user is verify and it return the token
- build logIn and signUp using jwt authentication
- make simple UI connect this to the backend jwt authentication server
- use In memory database into the dynamic authentication

----

## what is JWT Token ?
- JWT stands for **JSON Web Token** -> its way to transfer securly user information between frontend (client side) and backend (server side) using signed token of storing session data on the server
- When a user logs in the backend 
   - Verifise their credentials (email, password, etc.)
   - Creates  a token with user information(payload)
   - signs it using a secrete key
   - send it to the frontend 
- Later, the frontend sends this token with each request -> server verifies it -> if valid user authenticated.

## Common JWT methods :
1. `jwt.sign() - To create a new token
2. jwt.verify() - To check if the token is valid and not expired.
3. jwt.decode() -To read the token payload without verifying it. 

## what is Dyanamic Authentication in Backend ?

- ```Dynamic authentication means that every user or request is authenticated dynamically(in real time) instead of using fixed credentials```

- ```when user login the backend(Express) creates a unique token or session fot that user, Then every request made by that user must include that token so the backend can verify each time ```

- ```so instead of one static password or api key , authentication beacomes dynamically```

- Each user has their own unique credential or token
- Authentication happens every time a request is made
- Token can expire,refresh or be revoked at any time

## How It work : 

1. `User Login` : The user send their credentials (email and password) to your backend

 ```js 
 POST/Login 
 {
  "email":"user123@1gmail.com",
  "password":"12345"
 }

   ```  

 2.**Backend Varifies Credentials** : The backend checks these credentials against the database if correct -> it checks a unique token(like JWT)

```js 
   const token = jwt.sign({username : username}, jwtPassword);
    return res.json({
        token,
    })   
 ```

 3.**Fronted Stores the token** : The frontend (browser/mobile) saves the token usually in

 - `LocalStorage`
 - `cookies`
 - `or SessionStorage`

 4.**protected Routes**: When the user makes another request (like `/Profile` or `dashboard`) the frontend sends in the request header

``` Authorization: Bearer <token> ```

5.**Backend validates the token** : Every time request comes in the backend runs a middleware that

- checks if a token exists
- verifies it using a secrete key
- Extracts user information (like `userid` or `email`)
  - if valid -> request allowed 
  - if not invalid or expeired -> backend returns `401 Unauthorized`

```js 

app.get("/users", function (req, res){
  const token = req.headers.authorization;
    try{ // Write your code logic here
        const decoded = jwt.verify(token, jwtPassword);
    })
    catch(err) {
        return res.status(403).json({
            msg : "invalid token"
        });
    }
});

```

1. `**Token Expiry/ Refresh**` :Tokens can expire after some time (like 1 hour)

- If the token expire then jwt not allow to login.
- it keeps your app secure
- The backend can issue a new token (referesh token) when needed

### JWT + Express

- install -
 ```bash 
  npm install express jsonwebtoken dotenv
```

```js 
import express from "express";
import jwt from "jsonwebtoken";
const app = express();
app.use(express.json());

// Login 

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validate user (for demo, using hardcoded values)

  if (email === "user123@gmail.com" && password === "1234") {
    const token = jwt.sign({ email }, "SECRET_KEY", { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Middleware for token verification

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const user = jwt.verify(token, "SECRET_KEY");
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

// Protected route
app.get("/dashboard", authenticate, (req, res) => {
  res.send(`Welcome ${req.user.email}!`);
});

app.listen(3000, () => console.log("Server running on port 3000"));

```


