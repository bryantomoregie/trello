const userModel = require("../models/User");
const jwt = require("jsonwebtoken");
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies["access_token"].token;

    if (!token) {
      const error = new Error("Please login to access the data");
      error.statusCode = 500;
      error.statusMessage = error.message;
      throw error;
    }
    const verify = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = await userModel.findById(verify.id);
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = isAuthenticated;
