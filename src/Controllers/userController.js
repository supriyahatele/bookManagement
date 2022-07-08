const bookModel = require("../Models/bookModel");
const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");

const createUser = async function (req, res) {

  try {
    res.setHeader('Access-Control-Allow-Origin', '*')
    let data = req.body;
    let createUser = await userModel.create(data);
    res.status(201).send({ status: true, message: 'Success', data: createUser })

  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }

}
// ===================================================[loginUser]================================================================

const loginUser = async function (req, res) {
  try {
    let userName = req.body.email;
    let password = req.body.password;

    let user = await userModel.findOne({ email: userName, password: password });
    if (!user)
      return res.status(400).send({
        status: false,
        msg: "username or the password is not corerct",
      });
    let token = jwt.sign(
      {
        userId: user._id.toString(),

      },
      "functionup-radon", { expiresIn: '1d' }
    );
    res.setHeader("x-api-key", token);
    res.status(201).send({ status: true, message: 'Success', data: { token: token } });
  }
  catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  }
}
module.exports = {createUser, loginUser}