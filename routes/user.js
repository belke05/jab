const express    = require('express');
const router     = express.Router();
const bcrypt = require("bcrypt");
const protectedRoute= require("../middleware/protectedRoute")
const uploaderMiddleware = require("../config/cloudinary.js");
const Users = require("./../models/users.js");
const Fighters = require("../models/fighters.js");
// const Leagues = require("../models/leagues.js");
// const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


router.get("/cage", protectedRoute,(req,res)=>{
  res.render("userPref/cage")
});

router.get("/preferences",protectedRoute,(req,res)=>{
  res.render("userPref/preferences")
});

// router.get("/cage", (req,res)=>{
//   res.render("userPref/cage")
// });

// router.get("/preferences", (req,res)=>{
//   res.render("userPref/preferences")
// });

module.exports = router;
