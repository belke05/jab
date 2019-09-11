const express = require("express");
const router = express.Router();
const Articles = require("../models/articles");
const Leagues = require("../models/leagues");
const Fighter = require("../models/fighters");
const Users = require("../models/users");

/* GET home page */

router.get(["/", "/home"], (req, res, next) => {
  returnAllArticles()
    .then(articles => {
      console.log(articles);
      // articles = articles.slice(10, 20);
      // return console.log(articles.length);
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
    })
    .catch(dbErr => {
      console.log(dbErr);
    });
});

router.post("/changesport", (req, res) => {
  console.log(req, "req");
  const sports = req.body.sports;
  console.log(sports);
  let response = [];
  if (sports.length === 0) {
    returnAllArticles()
      .then(dbRes => {
        console.log("her-------------", dbRes);
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

router.post("/addlike", (req, res) => {
  console.log("@ /addlike");
  addJab(req.body.id, req.session.currentUser._id)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;

// functions use in routes

function returnAllArticles() {
  return Articles.find({}).sort({ pub_date: "desc" });
}

function returnAllLeagues() {
  return Leagues.find();
}

async function addJab(art_id, curUserId) {
  const foundArticle = await FindArticle(art_id);
  let Users_that_jabbed = foundArticle.jabs;
  if (Users_that_jabbed.includes(curUserId)) {
    console.log("in if");

    const removeUser = await removeUserJab(art_id, curUserId);
    return "already jabbed";
  } else {
    console.log("in else");
    const updatedArtcile = await FindArtUpdateJab(art_id, curUserId);
    return updatedArtcile;
  }
}

function FindArticle(art_id) {
  return Articles.findById(art_id);
}

function FindArtUpdateJab(art_id, curUserId) {
  return Articles.findByIdAndUpdate(art_id, {
    $push: { jabs: curUserId }
  });
}

function removeUserJab(art_id, curUserId) {
  console.log("-------------------");
  console.log(curUserId);
  console.log("-------------------");
  return Articles.findByIdAndUpdate(art_id, {
    $pull: { jabs: curUserId }
  });
}

