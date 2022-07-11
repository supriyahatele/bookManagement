const bookModel = require("../Models/bookModel");
const userModel = require("../Models/userModel");
const mongoose = require('mongoose')
 const reviewModel=require("../models/reviewModel")
 //const{validateString}=require("../Controllers/bookController")
let rate=/^[1-4](\.[0-9][0-9]?)?$/
let n=5

 //=====================================CREATE REVIEW=============================================//

 function x(data) {
    if (!data || data == null || data === undefined) return false;
    return true
}
 const createReview = async function (req, res) {

    try {
        res.setHeader('Access-Control-Allow-Origin', '*')
        let data = req.body;
      //  let name=data.name;
       // if(!name) return res.status(400).send({status:false,message:"Name is require"})
     //   if(!data.reviewedBy) return res.status(400).send({status:false,message:"Enter your name or "})
        let bookId = req.params.bookId
        bookId=bookId.trim()
        
        if(!bookId){ return res.status(400).send({status:false,message:"BookId is require"})}
        if (!mongoose.isValidObjectId(bookId)) { return res.status(400).send({ status: false, msg: "invalid bookid" }) }
      
        const checkbook = await bookModel.findById(bookId)

        if (!checkbook) return res.status(404).send({ status: false, message: "No book found" })
        let rating1=data.rating
        if(!(rating1 >= 1 && rating1 <= 5)) return res.status(404).send({ status: false, message: "Enter a valid reting" })
        // let check2 = [1,1.5,2,2.5,3,3.5,4,4.5,5]
        // let checkrating = await check2.find(element => element == rating1)
        // if (!checkrating) { return res.status(400).send({ status: false, msg: "Enter your rating from this Only  [1,1.5,2,2.5,3,3.5,4,4.5,5]" }) }

        let review=data.review
        review=review.trim()
    if(!x(rating1)) return res.status(400).send({status:false,message:"Enter your's rating "})
    if(!x(review)) return res.status(400).send({status:false,message:"Enter your's review "})

        let newData = {
            bookId:bookId,
            reviewedBy: data.reviewedBy,
            reviewedAt: Date.now(),
            rating:data.rating,
            review:data.review
        }
        let createReview = await reviewModel.create(newData);
        let finelResult=await reviewModel.findOne({_id:createReview._id}).select({_id:1,bookId:1,reviewedBy:1,reviewedAt:1,rating:1,review:1})
       res.status(201).send({ status: true, message: 'Success', data: finelResult })

    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }

}

const updatedReviewById = async function (req, res) {
    

    try {
        let bookId = req.params.bookId
        let reviewId = req.params.reviewId;
        let { review, rating, reviewedBy } = req.body

        //bookId validation
        if (!bookId) return res.status(400).send({ status: false, message: "Please give book id" });
        if (!mongoose.isValidObjectId(bookId)) return res.status(400).send({ status: false, message: "Book Id is Invalid !!!!" })

        //bookId exist in our database
        const findBook = await bookModel.findOne({ _id: bookId, isDeleted: false }); //check id exist in book model
        if (!findBook) return res.status(404).send({ status: false, message: "BookId dont exist" });

        //review-
        if (!mongoose.isValidObjectId(reviewId)) return res.status(400).send({ status: false, message: "Review Id is Invalid !!!!" })

        const findReview = await reviewModel.findOne({ _id: reviewId, bookId: bookId, isDeleted: false, }); //check id exist in review model
        if (!findReview) return res.status(404).send({ status: false, message: `reviewId dont exist or this reviews is not for " ${findBook.title} " book`, });

        const updateReview = await reviewModel.findByIdAndUpdate({ _id: reviewId, bookId: bookId, isDeleted: false }, req.body, { new: true });
        return res.status(200).send({ status: true, message: "Successfully Update review", data: updateReview, });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};

const deleteReview=  async function(req,res){

    try{
const bookId= req.params.bookId
const reviewId= req.params.reviweId

if (!mongoose.isValidObjectId(bookId))  return res.status(400).send({ status: false, msg: "invalid bookid" }) 
if (!mongoose.isValidObjectId(reviewId)) return res.status(400).send({ status: false, msg: "invalid reviewId" }) 

const checkBook= await bookModel.findById(bookId)
if(!checkBook) return res.status(404).send({status: false, msg: " book not present"})

const checkReview= await reviewModel.findById(reviewId)
if(!checkReview)return res.status(404).send({status: false, msg : "no review exists"})

if (checkReview.isDeleted=== true)return res.status(400).send({ status:false, msg:"already deleted"})

const deleteBook= await reviewModel.findOneAndUpdate({ _id: bookId }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })
 
res.status(200).send({ status:true, msg:"deleted successfully",data:deleteBook})
    }catch(err){
        res.status(500).send({ status:false,error: err.message })
    }
}
module.exports={createReview,updatedReviewById,deleteReview}