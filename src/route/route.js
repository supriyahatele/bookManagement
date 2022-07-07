const express = require('express');
const router = express.Router();


const { createBook,getBook,getBookById} = require('../Controllers/bookController')
const { createUser,loginUser} = require('../Controllers/userController')
const { checkBody,validUserModel,validBookModel} = require("../vaildator/validations.js")


router.post('/register',checkBody,validUserModel,createUser)
router.post("/login",checkBody,loginUser)
router.post('/books',checkBody,validBookModel,createBook)

router.get('/books',getBook)
router.get('/books/:bookId',getBookById)


module.exports = router
