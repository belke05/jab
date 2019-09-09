const express = require("express");
const router = express.Router();
const Articles = require("../models/articles");

/* GET home page */

router.get("/", (req, res, next) => {
  Articles.find({})
    .sort({ pub_date: "desc" })
    .then(articles => {
      console.log(articles);
      articles = articles.slice(0, 5);
      res.render("index", {
        articles: articles,
        scripts: ["home.js"],
        isLoggedIn: true,
        title: "JAB Home"
      });
    })
    .catch(dbErr => {
      console.log(dbErr);
    });
});

router.get("/home", (req, res) => {
  res.redirect("/");
});

module.exports = router;

