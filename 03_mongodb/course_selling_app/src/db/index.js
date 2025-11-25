import mongoose from 'mongoose';

// connect mongoose

mongoose.connect(process.env.MONGO_URL,{
        dbNames: course_selling_app
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Define schema

const adminSchema = new mongoose.Schema({
    username : String,
    password : String
});

const userSchema = new mongoose.Schema({
    username : String,
    password : String
});

const courseSchema = new mongoose.Schema({
    title : String,
    discription : String,
    imagelink : String,
    price : Number
})

// Create User Model

const Admin = mongoose.model("Admin", adminSchema);
const User = mongoose.model("User", userSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports = {
    Admin,
    User,
    Course
}