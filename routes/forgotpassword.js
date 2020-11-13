var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');
const saltRounds = 10;


let db = new sqlite3.Database('Project1.db', err => {
  if (err) {
    throw err
  }
});

router.get('/:token', function(req, res, next) {
    let token = req.params.token;
    res.render('user/forgotpassword', {token: token});
});

router.post('/', function(req, res, next){

  let password = req.body.password;
  let cryptpassword = bcrypt.hashSync(password, saltRounds);
  let token = req.body.token;

  let confirmpassword = req.body.confirmpassword;

        let request = db.run('UPDATE users SET password = ? WHERE token = ?', [cryptpassword, token], function(err){
          if(err){
            console.error(err);
            next();
            return;
          }
          res.redirect('/signin');
        });
});

module.exports = router;
