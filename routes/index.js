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

router.get("/signin", (req, res) => {
  res.render("authentication/signin", { title: "Sign in" });
});

router.get("/signup", (req, res) => {
  res.render("authentication/signup", {
    title: "Sign up",
    scripts: ["../javascripts/signup.js"]
  });
});

module.exports = router;
