const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', {isLoggedIn : true, title: "JAB Home"});
});



router.get("/home", (req,res)=>{
  res.redirect("/");
})

router.get("/signin", (req,res)=>{
  res.render("authentication/signin", {title:"Sign in"})
})

router.get("/signup", (req,res)=>{
  res.render("authentication/signup", {title:"Sign up", scripts: ["../javascripts/signup.js"]})
})

module.exports = router;