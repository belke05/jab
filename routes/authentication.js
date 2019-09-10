const express = require("express");
// const passport   = require('passport');
const router = express.Router();
const bcrypt = require("bcrypt");

const uploaderMiddleware = require("../config/cloudinary.js");
const Users = require("./../models/users.js");
const Fighters = require("../models/fighters.js");
const Leagues = require("../models/leagues.js");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

router.get("/signin", (req, res) => {
  res.render("authentication/signin");
});

router.get("/logout", ensureLoggedIn("/signin"), (req, res) => {
  req.logout();
  res.redirect("/");
});

// router.get('/signup', ensureLoggedOut(), (req, res) => {

router.get("/signup", ensureLoggedOut(), (req, res) => {
  Fighters.find()
    .then(fightersList => {
      console.log("Fighters Found", fightersList);
      Leagues.find()
        .then(leaguesList => {
          console.log("leagues found", leaguesList);
          res.render("authentication/signup", {
            title: "Sign up",
            scripts: ["../javascripts/signup.js"],
            fighters: fightersList,
            leagues: leaguesList
          });
        })
        .catch(dbErr2 => console.log(dbErr2));
    })
    .catch(dbErr => console.log("Fighters Request Error", dbErr));
});

router.post(
  "/signup",
  uploaderMiddleware.single("imgPath"),
  (req, res, next) => {
    const user = req.body;
    const userLeagues = user.leagues;
    user.leagues = [];
    var dbLeague;
    Leagues.find().then(leaguesList => {
      console.log("leagues found", leaguesList);
      dbLeague = leaguesList;
      console.log(dbLeague);
      dbLeague.forEach(league => {
        if (userLeagues.indexOf(league.name) >= 0) {
          user.leagues.push(league._id);
        }
      });
    });
    if (!user.email || !user.password || !user.username) {
      res.render("authentication/signup", { msg: "All fields are required." });
      return;
    } else {
      Users.findOne({ username: user.username }).then(dbRes => {
        if (dbRes) {
          res.render("authentication/signup", { msg: "User already exists !" });
          return;
        }
        const salt = bcrypt.genSaltSync(10);
        const hashed = bcrypt.hashSync(user.password, salt);
        user.password = hashed;
        if (req.file) user.imgPath = req.file.secure_url;
        Fighters.findOne({ name: user.fighter })
          .then(fighter => {
            console.log("fighter Found");
            user.fighter = fighter._id;
          })
          .then(() => {
            Users.create(user).then(() => {
              res.redirect("/signin");
            });
          })
          .catch(dbErr => {
            next(dbErr);
          });
      });
    }
  }
);

module.exports = router;
