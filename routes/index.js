const express = require("express");
const router = express.Router();
const Articles = require("../models/articles");
const Leagues = require("../models/leagues");

/* GET home page */

router.get("/", (req, res, next) => {
  returnAllArticles()
    .then(articles => {
      console.log(articles);
      articles = articles.slice(0, 10);
      returnAllLeagues()
        .then(leagues => {
          res.render("index", {
            articles: articles,
            scripts: ["home.js"],
            title: "JAB Home",
            leagues: leagues
          });
        })
        .catch(dbErr => {
          console.log("error finding leagues");
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
router.post("/changesport", (req, res) => {
  console.log(req, "req");
  const sports = req.body.sports;
  console.log(sports);
  let response = [];
  if (sports.length === 0) {
    returnAllArticles()
      .then(dbRes => {
        res.send(dbRes);
      })
      .catch(dbErr => {
        console.log(dbErr);
      });
  } else {
    Articles.find({ league: { $in: sports } })
      .then(dbRes => {
        res.send(dbRes);
      })
      .catch(dbErr => {
        console.log("there was an error", dbErr);
      });
  }
});

module.exports = router;

function returnAllArticles() {
  return Articles.find({}).sort({ pub_date: "desc" });
}

function returnAllLeagues() {
  return Leagues.find();
}
