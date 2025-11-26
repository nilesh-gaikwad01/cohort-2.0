const {Router} = require('express');
const router = Router();
const userMiddleware = require("../middlewares/user");
const { User, Course } = require("../db");
const { json } = require('body-parser');
const mongoose = require("mongoose");
// User Routes

router.post("/Signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.Create({
        username,
        password
    }); 

    res.status(403).json({
        msg: "User created seccessfully"
    });
});

router.get("/courses", userMiddleware,  async (req, res) => {

    const Response = await Course.find({});

    res.json({
        Response
    });
});

router.get("/courses/:courseId", userMiddleware, async (req, res) => {
    const courseId = req.params.courseId;
    const username = req.body.username;

    await User.findOne({
        username : username
    }, {
        "$push": {
            purchasedCourse : courseId
        }
    })
    res.json({
        message : "Purchase complete"
    })
})

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
    const user = await User.findOne({
        username: req.body.username
    });

    console.log(user.purchasedCourse);
    const courses = await Course.find({
        _id: {
             "$in": user.purchasedCourse
        }
    });

    res.json({
        courses: courses
    })


});

module.exports = router
