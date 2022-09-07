const router = require("express").Router();
const listRoutes = require("./listRoutes");
const userRoutes = require("./userRoutes");

router.use("/list", listRoutes);
router.use("/user", userRoutes);

module.exports = router;
