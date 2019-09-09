const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', {isLoggedIn : true, title: "JAB Home"});
});



router.get("/home", (req,res)=>{
  res.redirect("/");
})

module.exports = router;