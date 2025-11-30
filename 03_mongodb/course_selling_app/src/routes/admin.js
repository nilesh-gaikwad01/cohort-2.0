const express = require('express');
const mongoose = require("mongoose");
// const {Router, response} = require('express');
const adminMiddleware = require('../middlewares/admin');
const { Admin, Course } = require("../db");
const router = express.Router();


// Admin Routes

router.post("/signup", async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

// Check the userame is already exists
  await Admin.create({
        username: username,
        password : password
    })
    
    res.json({
        msg : "Admin created successfuuly"
    })
});

router.post("/courses", adminMiddleware, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const  price = req.body.price;

    await Admin.create({
        title,
        description,
        imageLink,
        price
    })

    res.status(403).json({
        msg : "Course Created successfully"
    })

});

router.get("/courses", adminMiddleware, async (req, res) => {
   const  response = await Course.find({});

   res.json(
    Response
   )
});

module.exports = router
