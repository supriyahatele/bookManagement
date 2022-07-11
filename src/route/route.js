const express = require('express');
const router = express.Router();


const { createBook,getBooks,getBookById,updateBook,deleteBook} = require('../Controllers/bookController')
const { createUser,loginUser} = require('../Controllers/userController')
const { checkBody,validUserModel,validBookModel} = require("../vaildator/validations.js")
const {authoriseBook,authentication,authoriseParams}=require("../middlware/authentication")

router.post('/register',checkBody,validUserModel,createUser)
router.post("/login",checkBody,loginUser)
router.post('/books',checkBody,validBookModel,authentication,authoriseBook,createBook)

router.get('/books',authentication,getBooks)

router.get('/books/:bookId',authentication,authoriseParams,getBookById) 
//router.get('/books/:bookId',getBookById)
router.put('/books/:bookId',authentication,authoriseParams,updateBook)

router.delete('/books/:bookId',authentication,authoriseParams,deleteBook)

module.exports = router
