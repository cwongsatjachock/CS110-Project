require('dotenv').config();
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");

function getUserFromToken(token) {
  const userInfo = jwt.verify(token, process.env.SECRET);
  return User.findById(userInfo.id);
}

module.exports = { getUserFromToken };
