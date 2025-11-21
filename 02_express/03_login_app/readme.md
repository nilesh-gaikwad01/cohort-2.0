## login page with JWT Authentication In memory database

- inside the login page , I make the simple UI With username and Password field
- `login ` `Get ALL users` button for the login up user get remaining user it shows only the usernname to the User UI
- backned have the already in memory database to the exesting users and their password
- The Users simply `login`  send to the usename and password to the backend server
- Then backend server verify the  user data using JWT password and return JWT token to the user 
- Returned jwt token stored in the browser local storage
- once the user `Get all User` button, fonted send the token
- UI shows the User Data



# Output

## **User Logged In**

![output 1](<./images/Screenshot 2025-10-15 234911.png>)

## **Get Not Logged User Once Loggen In**

![output 2](<./images/Screenshot 2025-10-15 234924.png>)

## **User is not valid**

![output 3](<./images/Screenshot 2025-10-15 235018.png>) 

## **Server Is Running**

![output 4](<./images/Screenshot 2025-10-15 235606.png>)

