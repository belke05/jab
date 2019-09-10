const express    = require('express');
const router     = express.Router();
const bcrypt = require("bcrypt");

const uploaderMiddleware = require("../config/cloudinary.js");
const Users = require("./../models/users.js");
const Fighters = require("../models/fighters.js");
const Leagues = require("../models/leagues.js");

router.get('/signup', (req, res) => {
    Fighters
    .find()
    .then (fightersList => {
      console.log("Fighters Found", fightersList)
      Leagues
      .find()
      .then(leaguesList => {
        console.log("leagues found", leaguesList)
        res.render('authentication/signup', {title:"Sign up", scripts: ["../javascripts/signup.js"], fighters: fightersList, leagues: leaguesList});
      })
      .catch(dbErr2 => console.log(dbErr2));
    })
    .catch(dbErr => console.log("Fighters Request Error", dbErr));
});

router.get("/signin", (req,res)=>{
  res.render("authentication/signin")
})

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});


router.post("/signup",  uploaderMiddleware.single("imgPath"),(req, res, next) => {
  const user = req.body; 
  const userLeagues = user.leagues
  user.leagues = [];
  var dbLeague;
  Leagues.find()
  .then (leaguesList => {
    console.log("leagues found", leaguesList)
    dbLeague = leaguesList;
    console.log (dbLeague)
    dbLeague.forEach(league => {
      if (userLeagues.indexOf(league.name)>=0){
        user.leagues.push(league._id)
      }
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
         .then (()=>{
            Users
            .create(user)
            .then(() => {
                      req.session.currentUser = user;
              res.redirect("/signin")
            })
          })
          .catch(dbErr => {
            next(dbErr);
          });
      });
    }
  });
});

router.post("/signin", (req, res, next) => {
  const user = req.body;
  if (!user.username || !user.password) {
    res.render("authentication/signin", { msg: "Please fill in all the fields" , title: "Sign in" });
  }
  Users
    .findOne({ username: user.username })
    .then(dbRes => {
      if (!dbRes) {
        res.render("authentication/signin", { msg: "Bad username or password" , title: "Sign in" });
        return;
      }
      if (bcrypt.compareSync(user.password, dbRes.password)) {
        req.session.currentUser = user;
        res.redirect("/");
        return;
      } else {
        res.render("authentication/signin", { msg: "Bad username or password", title: "Sign in" });
        return;
      }
    })
    .catch(dbErr => {
      req.session.destroy();
      next(dbErr);
    });
});

module.exports = router;
