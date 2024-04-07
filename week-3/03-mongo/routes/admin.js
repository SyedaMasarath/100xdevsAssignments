const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require('../db/index')

router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const usernameAdmin = req.headers["username"]
    const passwordAdmin = req.headers["password"]
    const existingAdmin = await Admin.findOne({ usernameAdmin }).exec()
    if (existingAdmin) return res.status(409).json({ message: 'Admin already exist' })
    try{
    const adminCreated = await Admin.create({
        username: usernameAdmin,
        password: passwordAdmin
      });
    res.status(200).json({ message: 'Admin created successfully' })
    }
    catch(e){
        res.status(500).json({ message: error.message })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const { title, description, price, imageLink, published } = req.body
    try {
    const courseCreated = await Course.create({
      title,
      description,
      price,
      imageLink,
      published
    })
    res.status(200).json({ message: 'Course created successfully', courseId: courseCreated._id })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});
// GET /admin/courses
//   Description: Returns all the courses.
//   Input: Headers: { 'username': 'username', 'password': 'password' }
//   Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] } */
// // Admin Routes

router.get('/courses', adminMiddleware,async (req, res) => {
    // Implement fetching all courses logic
    try {
        const courses = await Course.find()
        res.status(200).json({ courses: courses })
      } catch (error) {
        res.status(500).json({ message: error.message })
      }
});

module.exports = router;