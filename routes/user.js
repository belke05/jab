const express    = require('express');
const router     = express.Router();
const bcrypt = require("bcrypt");
const protectedRoute= require("../middleware/protectedRoute")
const uploaderMiddleware = require("../config/cloudinary.js");
const Users = require("./../models/users.js");
const Fighters = require("../models/fighters.js");
const Leagues = require("../models/leagues.js");
// const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


router.get("/cage", protectedRoute,(req,res)=>{
  res.render("userPref/preferences")
});

router.get("/preferences",protectedRoute,(req,res)=>{
  let userId= req.session.currentUser._id;
  // console.log ("ici *********")
  // console.log(userId);
  // console.log("*****************la");
  // console.log(req.session.currentUser)
  var user;
  var userLeaguesIds =[];
  var userLeagues =[];
  // Users.findOne({username: req.session.currentUser.username})
  Users.findById(userId)
    .then(userRes=>{
      console.log("user found", userRes)
      user = userRes;
      userLeaguesIds = userRes.leagues;
      Fighters.findById(userRes.fighter)
        .then(fighterRes=>{
          console.log("Favorite Fighter Found", fighterRes)
          user.fighterName = fighterRes.name;
          user.fighterImgPath = fighterRes.imgPath;
          var date = new Date(user.created)
          user.creationDate = date.toDateString();
          Leagues.find()
          .then (leaguesList => {
            leaguesList.forEach(league => {
              if (userLeaguesIds.indexOf(league._id)>=0){
                userLeagues.push({_id:league._id, name:league.name, imgPath: league.imgPath})
              }
            });
            res.render("userPref/preferences", {
              title: "cage", 
              user: user,
              leagues: userLeagues
            });
          })
        })
    })
    .catch(userErr=> console.log(userErr))
});



module.exports = router;
