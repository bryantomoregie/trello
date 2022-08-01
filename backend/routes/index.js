const router = require("express").Router();
const listRoutes = require("./listRoutes");
const userRoutes = require("./userRoutes");

router.use("/list", listRoutes);
router.use("/user", userRoutes);

router.use((req, res) => {
  res.status(404).send("<h1>😝 404 Error!</h1>");
});

module.exports = router;