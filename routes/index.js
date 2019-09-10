const express = require("express");
const router = express.Router();
const Articles = require("../models/articles");
const Leagues = require("../models/leagues");

/* GET home page */

router.get("/", (req, res, next) => {
  Articles.find({})
    .sort({ pub_date: "desc" })
    .then(articles => {
      console.log(articles);
      articles = articles.slice(0, 10);
      Leagues.find().then(dbRes => {
        console.log("tags found", dbRes);
        res.render("index", {
          articles: articles,
          scripts: ["home.js"],
          title: "JAB Home",
          displayTitle: true,
          leagues: dbRes
        });
      });
    })
    .catch(dbErr => {
      console.log(dbErr);
    });
});

router.get("/home", (req, res) => {
  res.redirect("/");
});

// router.post("/addlike", (req, res) => {
//   Articles.findById(req.id).then(res => {
//     if(res.jabs.includes(req.session.user.id)){
//       //
//     }
//   }).catch()
//   Articles.findByIdAndUpdate(req.id, { jabs: req.jabs + 1 })
//     .then(dbRes => {console.log('')})
//     .catch(dbErr => {});
// });

module.exports = router;
