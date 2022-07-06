const express = require('express');
const router = express.Router();


const boookControllers = require('../Controllers/bookController')
const userControllers = require('../Controllers/userController')


router.post('/register',userControllers.createUser)
router.post('/books',boookControllers.createBook)



module.exports = router
