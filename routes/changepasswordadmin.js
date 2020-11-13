var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3');
const check = require('./check')
const bcrypt = require('bcrypt');
const saltRounds = 10;


let db = new sqlite3.Database('Project1.db', err => {
  if (err) {
    throw err
  }
});

router.get('/:userId', check.checkConn, function(req, res, next) {
    let id = req.params.userId;
    res.render("admin/changepasswordadmin", {userId: id});
});

router.put('/', check.checkAdmin, check.checkConn, function(req, res, next) {

  let id = req.body.user_id;
  let password = req.body.password;

  let cryptpassword = bcrypt.hashSync(password, saltRounds);


  db.run('UPDATE users SET password = ? WHERE id = ?', [cryptpassword, id], function(err){
    if(err){
      console.error(err);
      next();
      return;
    }
    res.send(true);
  });


});


module.exports = router;
