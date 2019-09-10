

 function protectedRoute(req,res,next){
  if(req.session.currentUser){
    next();
  }else{
    res.redirect("/signin");
  }
}

// with a wrapper function 

// function protectedRoute(param){
//   return function(req,res,next){
//     if(req.session.currentUser){
//       next();
//     }else{
//       res.redirect(param);
//     }
//   }
// }

module.exports = protectedRoute;