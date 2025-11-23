import express from 'express';
import { Router } from 'express';
import {bodyParser} from 'express';

const app = express();
const Router = 

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use("/admin", adminRouter)
app.use("user/", userRouter)


const Port = 1030;

app.listen(PORT, () => {
    console.log(`server is runing on ${PORT}`);   
});



