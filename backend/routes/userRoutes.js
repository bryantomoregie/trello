const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middleware/auth.js");

const router = express.Router();

const userModel = require("../Models/User");

//Creating register route
router.route("/register").post(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //Check emptyness of the incoming data
    if (!name || !email || !password) {
      return res.json({ message: "Please enter all the details" });
    }

    //Check if the user already exist or not
    const userExist = await userModel.findOne({ email: req.body.email });
    if (userExist) {
      return res.json({ message: "User already exist" });
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;
    const user = new userModel(req.body);
    await user.save();
    const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    const { password: _, ...everythingElse } = user;
    return res.cookie("access_token", token).json({
      success: true,
      message: "user registered successfully",
      data: everythingElse,
    });
  } catch (error) {
    return next(error);
  }
});

//Creating login routes
router.route("/login").post(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //Check emptyness of the incoming data
    if (!email || !password) {
      throw new Error("Please enter all the details");
    }
    //Check if the user already exist or not
    const userExist = await userModel.findOne({ email: req.body.email });
    if (!userExist) {
      throw "yo";
      // throw new Error("User does not exist");
    }
    //Check password match
    const isPasswordMatched = await bcrypt.compare(
      password,
      userExist.password
    );
    if (!isPasswordMatched) {
      const error = new Error("Please check password and try again");
      error.statusCode = 500;
      error.statusMessage = error.message;
      throw error;
    }
    const token = await jwt.sign(
      { id: userExist._id },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    return res
      .cookie("access_token", { token: token })
      .json({ success: true, message: "LoggedIn Successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }
});

//Creating logout routes
router.route("/logout").get(async (req, res, next) => {
  try {
    res.clearCookie("access_token", { path: "/" });
    return res.status(200).end();
  } catch (error) {
    return res.json({ error: error });
  }
});

//Creating user routes to fetch users data
router.route("/user").post(async (req, res, next) => {
  try {
    const user = await userModel.find();
    if (!user) {
      return res.json({ message: "No user found" });
    }
    return res.json({ user: user });
  } catch (error) {
    return res.json({ error: error });
  }
});

router
  .route("/check-credentials")
  .get(isAuthenticated, async (req, res, next) => {
    res.json({});
  });

router.route("/delete-users").delete(async (req, res, next) => {
  userModel
    .deleteMany({ age: { $gte: 15 } })
    .then(function () {
      res.json({ message: "All users deleted" }); // Success
    })
    .catch(function (error) {
      res.json({ error: error }); // Failure
    });
});

module.exports = router;
