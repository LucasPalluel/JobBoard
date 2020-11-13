exports.checkConn = function(req, res, next){
  if(req.session.userId != undefined){
    next();
  }else{
    res.redirect("/signin");
  }
}
exports.checkAdmin = function(req, res, next){
  if(req.session.idrole == 1){
    next();
  }else{
    res.redirect("/");
  }
}
exports.checkUnConn = function(req, res, next){
  if(req.session.userId === undefined){
    next();
  }else{
    res.redirect("/");
  }
}
