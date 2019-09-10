const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const protectedRoute = require("../middleware/protectedRoute")
const uploaderMiddleware = require("../config/cloudinary.js");
const Users = require("./../models/users.js");
const Fighters = require("../models/fighters.js");
const Leagues = require("./../models/leagues.js");
const Article = require("./../models/articles.js");


// const Leagues = require("../models/leagues.js");
// const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


router.get("/cage", protectedRoute, (req, res) => {
  const userId = req.session.currentUser.id;
  console.log(req.session,"right here baby")
  Users.findById(userId)
    .then(userRes => {
      console.log(userRes);
      Fighters.findById(userRes.fighter)
        .then(fighterRes => {
          console.log(fighterRes);
          Leagues.find({
              name: {
                $in: userRes.preferences
              }
            })
            .then(leagueRes => {
              console.log(leagueRes);
              Article.find({
                  league: {
                    $in: userRes.preferences
                  }
                })
                .then(articleRes => {
                  console.log(articleRes);
                  res.render("userPref/cage", {
                      league: leagueRes,
                      article: articleRes,
                      userPref: {
                        fighter: fighterRes,
                        user: userRes
                      }
                    })
                    .catch()
                })
                .catch()
            })
            .catch()
        })
        .catch();
    })
});

router.get("/preferences", protectedRoute, (req, res) => {
  res.render("userPref/preferences")
});


// router.post("/cage",(req,res)=>{
//   // Users.find({_id:req.body.id})
//   // .then(dbRes =>{
//   //   console.log(dbRes);
//   //   res.render("")
//   // })
//   // .catch()
// });

// router.get("/cage", (req,res)=>{
//   res.render("userPref/cage")
// });

// router.get("/preferences", (req,res)=>{
//   res.render("userPref/preferences")
// });

module.exports = router;