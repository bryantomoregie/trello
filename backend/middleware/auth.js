const userModel = require("../models/User");
const jwt = require("jsonwebtoken");
const isAuthenticated = async (req, res, next) => {
  try {
    const accessToken = req.cookies["access_token"];

    if (!accessToken) {
      const error = new Error("Please login to access the data");
      error.statusCode = 500;
      error.statusMessage = error.message;
      throw error;
    }

    const verify = await jwt.verify(accessToken.token, process.env.SECRET_KEY);
    req.user = await userModel.findById(verify.id);
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = isAuthenticated;
