var express = require("express");
var router = express.Router();
const authRouter = require("./auth");
const postsRouter = require("./posts");

/* GET home page. */
router.get("/", (req, res) => {
  res.send("index");
});

router.use("/auth", authRouter);
router.use("/posts", postsRouter);

module.exports = router;
