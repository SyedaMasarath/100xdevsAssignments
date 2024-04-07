const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require('../db/index');
const SECRET_KEY = 'mysecretkey';
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(403).json({ message: 'Token not provided' });
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Failed to authenticate token' });
      }
      next();
    });
  }
// Admin Routes
router.post('/signup',async (req, res) => {
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

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const isAdmin = await Admin.findOne({ username: req.body.username }).exec();
    console.log(isAdmin);
    if (!isAdmin || isAdmin.password !== req.body.password) {
        return res
        .status(500)
        .send({ message: "Admin does not exist with these credentials" });
    }
    const { username, password } = req.body;
    const token = jwt.sign({ username, password}, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

router.post('/courses', verifyToken,async (req, res) => {
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

router.get('/courses', verifyToken,async (req, res) => {
     // Implement fetching all courses logic
     try {
        const courses = await Course.find()
        res.status(200).json({ courses: courses })
      } catch (error) {
        res.status(500).json({ message: error.message })
      }
});

module.exports = router;