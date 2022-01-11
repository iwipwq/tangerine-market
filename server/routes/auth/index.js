const express = require("express");
const router = express.Router();
const authCtr = require("../../controller/authCtr");

router.post("/register", authCtr.register);
router.post("/login", authCtr.login);

router.get("/login", (req, res) => {
  res.send("login");
});

router.get("/register", (req, res) => {
  res.send("register");
});

module.exports = router;
