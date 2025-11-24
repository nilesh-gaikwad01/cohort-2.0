const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
// Need to import form the Router
const adminRouter = require("./src/routes/admin");
const userRouter = require("./src/routes/user");

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use("/admin", adminRouter)
app.use("user/", userRouter)


const PORT = 1030;

app.listen(PORT, () => {
    console.log(`server is runing on ${PORT}`);   
});



