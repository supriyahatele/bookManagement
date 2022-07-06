const bookModel = require("../Models/bookModel");
const userModel = require("../Models/userModel");


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
module.exports = {
    createBook
}