let checkBody = async function(req,res,next){
  
    try{let data = req.body
  if (Object.keys(data).length == 0) {return res.status(400).send({status : false, msg : "Bad request- Please enter details in the request Body "})}
  
 next()
}
catch(err){
    res.status(500).send({error : err.messsage})
}}
module.exports.checkBody=checkBody