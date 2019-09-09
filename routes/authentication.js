const express    = require('express');
const passport   = require('passport');
const router     = express.Router();

const uploaderMiddleware = require("../config/cloudinary.js");
const Users = require("./../models/users.js");
const Fighters = require("../models/fighters.js");
const Leagues = require("../models/leagues.js");
// const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-signin');


// router.get('/signin', ensureLoggedOut(), (req, res) => {
// router.get('/signin',  (req, res) => {
//     res.render('authentication/signin', { message: req.flash('error'), title:"Sign in"});
// });

router.get("/signin", (req,res)=>{
  res.render("authentication/signin")
})

// router.post('/signin', ensureLoggedOut(), passport.authenticate('local-signin', {
//   successRedirect : '/',
//   failureRedirect : '/signin',
//   failureFlash : true
// }));

// router.get('/signup', ensureLoggedOut(), (req, res) => {

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
      console.log("ici");
     
      // res.render('authentication/signup', { message: req.flash('error'),title:"Sign up", scripts: ["../javascripts/signup.js"], fighters: fightersList, leagues : leaguesList });
    })
    .catch(dbErr => console.log("Fighters Request Error", dbErr))
});


// router.post('/signup',  uploaderMiddleware.single("imgPath"), ensureLoggedOut(), passport.authenticate('local-signup', {
//   successRedirect : '/',
//   failureRedirect : '/signup',
//   failureFlash : true
// }));

// router.get('/profile', ensureLoggedIn('/signin'), (req, res) => {
//     res.render('authentication/profile', {
//         user : req.user
//     });
// });

// router.get('/logout', ensureLoggedIn('/signin'), (req, res) => {
//     req.logout();
//     res.redirect('/');
// });

module.exports = router;