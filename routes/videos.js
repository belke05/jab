const express = require("express");
const router = express.Router();

router.get("/videos", (req, res, next) => {
  res.render("videos", { scripts: ["videos.js"] });
});

module.exports = router;
