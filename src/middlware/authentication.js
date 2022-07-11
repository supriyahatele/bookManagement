const jwt = require('jsonwebtoken')
const bookModel = require('../Models/bookModel')
const userModel = require("../Models/userModel");

const mongoose = require('mongoose');



const authentication = function(req, res, next) {
    try{
        let token = req.headers["x-api-key" || "X-Api-Key"]
      if (!token) 
       return res.send({ status: false, msg: "token must be present" })
  
     jwt.verify(token,"functionup-radon", (err, user) => {
      if (err) 
          return res.status(401).send({msg: "invalid token"});
       req.user = user;
      // console.log(user)
        next();
  });
  }
    catch(err) 

    {
         res.status(500).send(err.message)
     }

}


  let authoriseParams = async function(req,res,next){
    try{let bookId= req.params.bookId
      if(!bookId){ return res.status(400).send({status:false,message:"BookId is require"})}

      if(!mongoose.isValidObjectId(bookId)){ return res.status(400).send({status:false, msg: "invalid bookId"})}
  let data1 = await bookModel.findById({_id:bookId}).select({ userId: 1, _id: 0 })

  if(!data1){return res.status(404).send({status:false, msg:"bookId doesnot exists"})}
   let userId =data1.userId.valueOf()
   let userId1 = req.user.userId
    let d=userId
     if(userId1!=userId)
     return res.status(403).send({status: false , msg : "Not allowed to modify another data"})
     
     next()}
     catch(err){
      res.status(500).send({error : err.messsage})
  }
  
  }


  let authoriseBook= async function(req,res,next){
    try{
        let userId= req.body.userId
        
        if(!mongoose.isValidObjectId(userId)){ return res.status(400).send({status:false, msg: "invalid author id"})     }
        let data = await userModel.findById({_id:userId})
      
        if(!data){return res.status(404).send({status:false, msg:"userId doesnot exists"})}
    
    let userId1 = req.user.userId
     if(userId!=userId1)
     return res.status(403).send({status: false , msg : "Not allowed to modify another data"})
     
     next()}
     catch(err){
      res.status(500).send({error : err.messsage})
  }
  
  } 


module.exports = { authoriseParams,authoriseBook,authentication}
