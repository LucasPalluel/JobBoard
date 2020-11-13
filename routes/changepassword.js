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

router.get('/', check.checkConn, function(req, res, next) {
    res.render('user/changepassword');
});

router.post('/', function(req, res, next){
  const userId = req.session.userId;
  let password = req.body.password;

  let cryptpassword = bcrypt.hashSync(password, saltRounds);


  let confirmpassword = req.body.confirmpassword;

        let request = db.run('UPDATE users SET password = ? WHERE id = ?', [cryptpassword, userId], function(err){
          if(err){
            console.error(err);
            next();
            return;
          }
          res.redirect('/profile');
        });
});

module.exports = router;
