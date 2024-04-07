const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const SECRET_KEY = 'mysecretkey';
const jwt = require('jsonwebtoken');
const { User, Course } = require('../db/index')

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(403).json({ message: 'Token not provided' });
    }
  
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Failed to authenticate token' });
      }
      //req.user = decoded;
      next();
    });
  }
// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
     // Implement user signup logic
     const usernameUser = req.headers["username"]
     const passwordUser = req.headers["password"]
     const existingUser = await User.findOne({ usernameUser }).exec()
     console.log(existingUser)
     if (existingUser) return res.status(409).json({ message: 'User already exist' })
     try {
       const userCreated = await User.create({
         username : usernameUser,
         password: passwordUser
       })
       console.log(userCreated)
       res.status(200).json({ message: 'User created successfully' })
     } catch (error) {
       res.status(500).json({ message: error.message })
     }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const isUser = await User.findOne({ username: req.body.username }).exec();
    console.log(isUser);
    if (!isUser || isUser.password !== req.body.password) {
        return res
        .status(500)
        .send({ message: "User does not exist with these credentials" });
    }
    const { username, password } = req.body;
    const token = jwt.sign({ username, password}, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

router.get('/courses',async (req, res) => {
    // Implement listing all courses logic
    try {
        const courses = await Course.find()
        res.status(200).json({ courses: courses })
      } catch (error) {
        res.status(500).json({ message: error.message })
      }
});

router.post('/courses/:courseId', userMiddleware,async (req, res) => {
    // Implement course purchase logic
    // Implement course purchase logic
    try {
        const courseId = req.params.courseId
        const { username } = req.headers
        const courseExists = await Course.findOne({ _id: courseId }).exec()
        if (!courseExists) return res.status(404).json({ message: "course does not exists" })
        const purchasedCourse = await User.findOneAndUpdate(
          { username },
          { $push: { purchasedCourses: courseExists._id } },
          { new: true, upsert: true }
        )
        res.status(200).json({
          message: 'Course purchased successfully',
          courseId: courseExists._id
        })
      } catch (error) {
        res.status(500).json({ message: error.message })
      }
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({ username: req.headers.username }).exec()
    //multiple purchased courses, purchasedcourses field saves a reference to actualcourse
    //we are finding each course from purchased course array, since it is multiple asynchronous calls we use promise
    const coursesPurchasedByUser = await Promise.all(
      user.purchasedCourses.map(async (courseId) => 
      {
        const course = await Course.findOne({ _id: courseId }).exec();
        return course;
      }
      )
    );
    res.status(200).json({ coursesPurchasedByUser })
});

module.exports = router