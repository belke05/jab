const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const uploaderMiddleware = require("../config/cloudinary.js");
const Users = require("./../models/users.js");
const Fighters = require("../models/fighters.js");
const Leagues = require("../models/leagues.js");

router.get("/signup", (req, res) => {
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

router.get("/signin", (req, res) => {
  res.render("authentication/signin");
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

router.post(
  "/signup",
  uploaderMiddleware.single("imgPath"),
  (req, res, next) => {
    const user = req.body;
    const userLeagues = user.leagues;
    user.leagues = [];
    user.leagueTag = [];
    var dbLeague;
    Leagues.find().then(leaguesList => {
      console.log("leagues found", leaguesList);
      dbLeague = leaguesList;
      console.log(dbLeague);
      dbLeague.forEach(league => {
        if (userLeagues.indexOf(league.name) >= 0) {
          user.leagueTag.push(league.name)
          user.leagues.push(league._id)
        }
      });
      if (!user.email || !user.password || !user.username) {
        res.render("authentication/signup", {
          msg: "All fields are required."
        });
        return;
      } else {
        Users.findOne({ username: user.username }).then(dbRes => {
          if (dbRes) {
            res.render("authentication/signup", {
              msg: "User already exists !"
            });
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
                req.session.currentUser = user;
                res.redirect("/signin");
              });
            })
            .catch(dbErr => {
              next(dbErr);
            });
        });
      }
    });
  }
);

router.post("/signin", (req, res, next) => {
  const user = req.body;
  if (!user.username || !user.password) {
    res.render("authentication/signin", {
      msg: "Please fill in all the fields",
      title: "Sign in"
    });
  }
  Users.findOne({ username: user.username })
    .then(dbRes => {
      if (!dbRes) {
        res.render("authentication/signin", {
          msg: "Bad username or password",
          title: "Sign in"
        });
        return;
      }
      user._id = dbRes._id;
      if (bcrypt.compareSync(user.password, dbRes.password)) {
        req.session.currentUser = user;
        res.redirect("/");
        return;
      } else {
        res.render("authentication/signin", {
          msg: "Bad username or password",
          title: "Sign in"
        });
        return;
      }
    })
    .catch(dbErr => {
      req.session.destroy();
      next(dbErr);
    });
});

router.post("/fighterUpdate", (req, res, next) => {
  let fighterName = req.body.label;
  Fighters.findOne({ name: fighterName })
    .then(dbRes => {
      console.log(dbRes);
      res.send(dbRes);
    })
    .catch(dbErr => console.log(dbErr));
});

router.post("/signupinfos", (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let pass = req.body.password;
  let msg = "";
  
  Users.findOne ({username: username})
    .then(userRes=>{
      console.log(userRes)
      if (userRes)  msg= "Username already exists !";
      console.log("**************")
      Users.findOne ({email: email})
      .then(emailRes =>{
        console.log("^^^^^^^^^^^^^^^^^")
        console.log(emailRes)
      if (emailRes)  {
        if (msg == ""){
          msg = "E-mail already exists !";
        } else {
          msg = "Username and e-mail already exist"
        }
      }
      if(pass.length ==0){
        msg = "the password field is required"
      }
      res.send(msg);
      })
    })
    .catch(userErr => console.log(userErr));
  
});

module.exports = router;
