const express = require('express');
const router = express.Router();


const { createBook,getBooks,getBookById,updateBook,deleteBook} = require('../Controllers/bookController')
const { createUser,loginUser} = require('../Controllers/userController')
const { checkBody,validUserModel,validBookModel} = require("../vaildator/validations.js")
const {authoriseBook,authentication,authoriseParams}=require("../middlware/authentication")
const{createReview,updatedReviewById,deleteReview}=require('../Controllers/reviewController')
router.post('/register',checkBody,validUserModel,createUser)
router.post("/login",checkBody,loginUser)
router.post('/books',checkBody,validBookModel,authentication,authoriseBook,createBook)

router.get('/books',getBooks)

//router.get('/books/:bookId',authentication,authoriseParams,getBookById) 
router.get('/books/:bookId',getBookById)
router.put('/books/:bookId',authentication,authoriseParams,updateBook)

router.delete('/books/:bookId',authentication,authoriseParams,deleteBook)


router.post('/books/:bookId/review',createReview)
router.put('/books/:bookId/review/:reviewId',checkBody,updatedReviewById)
router.delete('/books/:bookId/review/:reviewId',deleteReview)



module.exports = router
