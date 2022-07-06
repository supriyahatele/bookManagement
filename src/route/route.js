const express = require('express');
const router = express.Router();


const boookControllers = require('../Controllers/bookController')
const userControllers = require('../Controllers/userController')
const validation = require("../vaildator/validations.js")


router.post('/register',validation.checkBody,userControllers.createUser)
router.post("/login", validation.checkBody,userControllers.loginUser)

router.post('/books',validation.checkBody,boookControllers.createBook)



module.exports = router
