const mongoose = require('mongoose');

// connect to the mongoose

mongoose.connect(process.env.MONGO_URL,{
        dbName: "course_selling_app"
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Define User and Admin schema

const AdminSchema = new mongoose.Schema({
    username : String,
    password : String
});

const UserSchema = new mongoose.Schema({
    username : String,
    password : String,
    purchasedCourse : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    title : String,
    discription : String,
    imagelink : String,
    price : Number
})

// Create User Model

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}