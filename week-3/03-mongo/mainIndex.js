const mongoose = require('mongoose');
const { Router } = require("express");
// const adminMiddleware = require("../middleware/admin");
const router = Router();

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:h3rZCiUZaqAbvIcC@cluster1.t087nru.mongodb.net/');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
  username: String,
  pasword: String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    pasword: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const CourseSchema = new mongoose.Schema({
    id: String,
    title : String,
    description: String,
    price: Number,
    imageLink : String,
    published : Boolean 
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

//admin signup
//app.use(express.json())
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const usernameAdmin = req.headers["username"]
    const passwordAdmin = req.headers["password"]
    var user = new Admin({ username: usernameAdmin, password: passwordAdmin });
    user.save(function(err) {
    //if (err) throw err;
    if(err){
        return res.status(404).json({
            message : 'error in admin user creation'
        })
    }
    else{
        res.status(200).json({
            message : "Admin Created Successfully"
        });
    }
    });
});

//user signup
  router.post('/signup', (req, res) => {
    // Implement user signup logic
    const usernameUser = req.headers["username"]
    const passwordUser = req.headers["password"]
    var user = new User({ username: usernameUser, password: passwordUser });
    user.save(function(err) {
    //if (err) throw err;
    if(err){
        return res.status(404).json({
            message : 'error in admin user creation'
        })
    }
    else{
        res.status(200).json({
            message : "User created successfully"
        });
    }
    });
});


//Middleware
async function userExists(username, password) {
    // should check in the database
     const findUser = await Admin.findOne({ username: username });
     if(findUser){
      return true;
     }
     return false;
}
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers["username"]
    const password = req.headers["password"]
    if(userExists(username,password)){
        next();
    }
    else{
        res.status(404).send("admin not found in db");
    } 
}
async function userExists(username, password) {
    // should check in the database
     const findUser = await User.findOne({ username: username });
     if(findUser){
      return true;
     }
     return false;
}
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username = req.headers["username"]
    const password = req.headers["password"]
    if(userExists(username,password)){
        next();
    }
    else{
        res.status(404).send("user not found in db");
    } 
}


// module.exports = {
//     Admin,
//     User,
//     Course
// }

//User Routes

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
  const courseList = Course.find();
  if (!courseList) {
    res.status(404).send({ message: "No courses found" });
  }
  res
    .status(200)
    .send({ message: "Courses fetched successfully", courses: courseList });
  // Implement listing all courses logic
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
  const courseId = new mongoose.Types.ObjectId(req.params.courseId);
  const username = req.headers["username"];

  try {
    const course = Course.findById(courseId).exec();
    if (!course) {
      return res.status(404).send({ message: "Course not found" });
    }
    const user = User.findOne({username:username}).exec();
    //finding course id in users purchased course object
    if (user.purchasedCourses.includes(courseId)) {
      return res.status(400).send({ message: "Course already purchased" });
    }
    user.purchasedCourses.push(courseId);
    user.save();
    res
      .status(200)
      .send({
        message: "Course purchased successfully",
        courseId: courseId,
        courseName: course.title,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers["username"];
    try {
        const user = User.findOne({username:username}).exec();
        if (!user.purchasedCourses || user.purchasedCourses.length === 0) {
          return res
            .status(404)
            .send({ message: "User not found or no purchased courses" });
        }
        res
          .status(200)
          .send({
            message: "Courses fetched successfully",
            courses: user.purchasedCourses,
          });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .send({ message: "Internal Server Error", error: error.message });
      }
});

//admin routes

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    //const courseid = Math.floor(Math.random() * Date.now()).toString(8);
    var newCourse = new Course(
        { 
          //id : courseid,
          title: req.body.title, 
          description: req.body.description,
          price: req.body.price,
          imageLink: req.body.imageLink
        }
    );
    newCourse.save(function(err) {
        //if (err) throw err;
        if(err){
            return res.status(404).json({
                message : 'course creation failed'
            })
        }
        else{
            res.status(200).json({
                message : "Course created successfully",
                courseId: newCourse._id
                //courseId: courseid
            });
        }
        });
});
// GET /admin/courses
//   Description: Returns all the courses.
//   Input: Headers: { 'username': 'username', 'password': 'password' }
//   Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] } */
// // Admin Routes

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    res.status(200).json(Course.find());
});
