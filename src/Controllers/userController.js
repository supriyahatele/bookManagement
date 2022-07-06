const bookModel = require("../Models/bookModel");
const userModel = require("../Models/userModel");


const createUser = async function (req, res) {
   
    try {
        res.setHeader('Access-Control-Allow-Origin','*')
        let data = req.body;
        let createUser = await userModel.create(data);
        res.status(201).send({ status: true, message: 'Success', data: createUser })

    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }

}
module.exports = {
    createUser
}