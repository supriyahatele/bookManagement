const bookModel = require("../Models/bookModel");
const userModel = require("../Models/userModel");
const mongoose = require('mongoose')
const reviewModel=require("../models/reviewModel")

const createBook = async function (req, res) {
   
    try {
        res.setHeader('Access-Control-Allow-Origin','*')
        let data = req.body;
        let createBook = await bookModel.create(data);
        res.status(201).send({ status: true, message: 'Success', data: createBook })

    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }

}

// ========================================================================================================


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
  }
  


const getBook = async function (req, res) {
    try {
        let data = req.query;
        if (Object.keys(data).length == 0)
            return res.status(400).send({ status: false, message: "Invalid Parameters" })

        let filterData = { isDeleted: false }
        const { userId, category, subcategory } = data

        if (userId) {
            if (!mongoose.isValidObjectId(userId))
                return res.status(400).send({ status: false, message: "Please enter valid userId " })
                let uid = await userModel.findById(userId)
             if (uid) filterData.userId = userId
            }

        if (category) {
            if (isValid(category) && /^[a-zA-Z]{2,20}$/.test(category)) { filterData.category = category }
            else { return res.status(400).send({ status: false, message: "Please enter valid category name" }) }
        }

        if (subcategory) {
            if (isValid(subcategory) && /^[a-zA-Z ]{2,20}$/.test(subcategory)) { filterData.subcategory = subcategory }
            else { return res.status(400).send({ status: false, message: "Please enter valid subcategory name" }) }
        }

        let findData = await bookModel.find({ filterData }).select(
            { title: 1, excerpt: 1, userId: 1, category: 1, reviews: 1, releasedAt: 1 }).sort({ title: 1 })

        if (findData.length == 0)
            return res.status(404).send({ status: false, message: "No books found" })
        else
            res.status(200).send({ status: true, message: 'Books list', data: findData });
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
}

// =============================================[get-book-by-id]===========================================================================
const getBookById= async function(req,res){

    try{
    const bookId = req.params.bookId
    if (!mongoose.isValidObjectId(bookId)) { return res.status(400).send({ status: false, msg: "invalid bookid" }) }
        
    const checkbook= await bookModel.findOne({bookId})

    if(!checkbook)  return res.status(404).send({ status: false, message: "No book found" })
   const reviewData=[];
   let finalREesult={ title:checkbook.title,excerpt:checkbook.excerpt,userId:checkbook.userId,category:checkbook.category,subcategory:checkbook.subcategory,isDeleted:checkbook.isDeleted,reviews:checkbook.reviews,releasedAt:checkbook.releasedAt,createdAt: checkbook.createdAt,updatedAt:checkbook.updatedAt,reviewData:reviewData}

    res.status(200).send({ status: true, message: 'Books ', data:finalREesult});
      
    }catch(err) {
        res.status(500).send({ status: false, message: err.message });
    }
}



module.exports = { createBook,getBook,getBookById}
