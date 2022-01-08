const express = require("express");
const router = express.Router();

router.get("/upload", (req, res) => {
  res.send("upload");
});

router.get("/:id", (req, res) => {
  res.send("id");
});

router.get("/update/:id", (req, res) => {
  res.send("update");
});

module.exports = router;
