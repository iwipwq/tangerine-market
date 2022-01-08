const express = require("express");
const upload = require("../../module/multer");
const postCtr = require("../../controller/postCtr");
const router = express.Router();

router.get("/upload", (req, res) => {
  res.send("upload");
});

router.get("/:id", postCtr.detail);

router.get("/update/:id", (req, res) => {
  res.send("update");
});

router.post("/", upload.single("image"), postCtr.upload);

module.exports = router;
