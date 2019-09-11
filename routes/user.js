const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const protectedRoute = require("../middleware/protectedRoute")
const uploaderMiddleware = require("../config/cloudinary.js");
const Users = require("./../models/users.js");
const Fighters = require("../models/fighters.js");
const Leagues = require("../models/leagues.js");
const Article = require("./../models/articles.js");

router.get("/cage", protectedRoute,(req,res)=>{
  res.render("userPref/preferences")
});

router.get("/preferences",protectedRoute,(req,res)=>{
  let userId= req.session.currentUser._id;
  var user;
  var userLeaguesIds =[];
  var userLeagues =[];
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

router.get("/cage", protectedRoute, (req, res) => {
  const userId = req.session.currentUser.id;
  console.log(req.session, "right here baby")
  Users.findOne({
      username: req.session.currentUser.username
    })
    
    .then(userRes => {
      console.log(userRes.leagueTag)
      Promise.all([Fighters.findById(userRes.fighter), Leagues.find({
        _id: userRes.leagues}), 
        Article.find({
        league:userRes.leagueTag  
      })
    ])
      .then(values => {
        console.log(values, "valuuuuuuuuuuuuuuuuuuuues");
        const [fighterRes, leagueRes,articleRes] = values;
        console.log(articleRes,"feauifhauifhaeuifhaief")
        res.render("userPref/cage", {
          league: leagueRes,
          article: articleRes,
          userPref: {
            fighter: fighterRes,
            user: userRes
          }
        });
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
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

module.exports = router;