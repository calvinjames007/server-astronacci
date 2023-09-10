require("dotenv").config();

let jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const signToken = (data) => {
    return jwt.sign(data, SECRET_KEY)
}

const verifyToken = (data) => {
    return jwt.verify(data, SECRET_KEY)
}

module.exports = {signToken, verifyToken}