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

const admin = mongoose.model("admin", adminSchema);
const user = mongoose.model("user", userSchema);
const course = mongoose.model("course", courseSchema);

module.exports = {
    admin,
    user,
    course
}