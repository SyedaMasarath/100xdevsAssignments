const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require('../db/index')

router.post('/signup', async (req, res) => {
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

router.get('/courses',async (req, res) => {
  try {
    const courses = await Course.find()
    res.status(200).json({ courses: courses })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
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

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
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

//Here's a simplified explanation of the Promise.all usage:
// user.purchasedCourses.map creates an array of Promises, where each Promise corresponds to the asynchronous operation of fetching a course.
// Promise.all waits for all these Promises to resolve (or one to reject) and returns a single Promise that resolves to an array of results (courses).
// This ensures that the response is sent only after all the courses have been fetched.
module.exports = router