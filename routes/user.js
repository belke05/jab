const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const protectedRoute = require("../middleware/protectedRoute");
const uploaderMiddleware = require("../config/cloudinary.js");
const Users = require("./../models/users.js");
const Fighters = require("../models/fighters.js");
const Leagues = require("./../models/leagues.js");
const Article = require("./../models/articles.js");

router.get("/preferences", protectedRoute, (req, res) => {
  let userId = req.session.currentUser._id;
  var user;
  Users.findById(userId)
    .then(userRes => {
      console.log("user found", userRes);
      user = userRes;
      userLeaguesIds = userRes.leagues;
      Fighters.find().then(fighterListRes => {
        console.log("all fighters found", fighterListRes);
        Fighters.findById(userRes.fighter).then(fighterRes => {
          console.log("Favorite Fighter Found", fighterRes);
          user.fighterName = fighterRes.name;
          user.fighterImgPath = fighterRes.imgPath;
          var date = new Date(user.created);
          user.creationDate = date.toDateString();
          Leagues.find().then(leaguesList => {
            console.log("all leagues found");
            console.log("***********");
            console.log(user);
            console.log(user.imgPath);
            if (!user.imgPath) {
              user.imgPath = "/images/logo/jabbed.png";
            }
            res.render("userPref/preferences", {
              title: "cage",
              user: user,
              leagues: leaguesList,
              fighters: fighterListRes,
              scripts: ["preferences.js", "general.js"]
            });
          });
        });
      });
    })
    .catch(userErr => console.log(userErr));
});

router.get("/cage", protectedRoute, (req, res) => {
  const userId = req.session.currentUser._id;
  console.log(req.session, "ici !");
  Users.findById(userId).then(user => {
    Article.find({ league: { $in: user.leagueTag } }).then(article => {
      console.log("************************");
      console.log(article);
      Fighters.findById(user.fighter)
        .then(fighter => {
          console.log(fighter);
          res.render("userPref/cage", {
            article: article,
            userPref: {
              fighter: fighter,
              user: user
            },
            scripts: ["cage.js", "general.js"]
          });
        })

        .catch(dbErr => {
          console.log("there is an error", dbErr);
        });
    });
  });
});

router.get("/userInfo", (req, res, next) => {
  const userId = req.session.currentUser._id;
  Users.findById(userId)
    .then(user => {
      console.log("user found", user);
      res.send(user);
    })
    .catch(userErr => console.log("user fetch error", userErr));
});

router.post("/newFighter", (req, res, next) => {
  let fighterId = req.body.fighter_id;
  Users.findOneAndUpdate(
    { _id: req.session.currentUser._id },
    { fighter: fighterId },
    { new: true }
  )
    .then(dbRes => console.log("new fighter updated", dbRes))
    .catch(dbErr => console.log("Error in fighter update", dbErr));
});

router.post("/newSports", (req, res, next) => {
  let sportsArray = req.body.selectedSports;
  Users.findOneAndUpdate(
    { _id: req.session.currentUser._id },
    { leagues: sportsArray },
    { new: true }
  )
    .then(dbRes => console.log("sports list updated", dbRes))
    .catch(dbErr => console.log("Error in sports list update", dbErr));
});

module.exports = router;
