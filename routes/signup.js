var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const check = require('./check')
var randtoken = require('rand-token');

function handleTokenHashing(token, saltRounds) {
  let crypttoken = bcrypt.hashSync(token, saltRounds)

  if (crypttoken.includes("/")) {
    crypttoken = handleTokenHashing(token, saltRounds)
  }

  return crypttoken;
}

let db = new sqlite3.Database('Project1.db', err => {
  if (err) {
    throw err
  }
});

router.get('/', check.checkUnConn, function(req, res, next) {
  db.all('SELECT * FROM users', (err, infos) => {
    if(err){
      console.error(err);
      next();
      return;
    }
    if(!infos){
      next();
      return;
    }
    res.render('user/signup', {infos: infos});
  });
});
router.post('/', function(req, res, next){
  let username = req.body.username;
  let name = req.body.name;
  let firstname = req.body.firstname;
  let email = req.body.email;
  let confirmemail = req.body.confirmemail;
  let password = req.body.password;
  let cryptpassword = bcrypt.hashSync(password, saltRounds);
  let confirmpassword = req.body.confirmpassword;
  let phone = req.body.phone;
  let birthdate = req.body.birthdate;
  let city = req.body.city;
  let postal = req.body.postal;
  let street = req.body.street;
  let role = 2;
  let token = randtoken.generate(16);

  db.get('SELECT login FROM users WHERE login = ?', username, (err, row) => {
    if (err) {
      console.error(err);
      res.json({message: "An error occured, please try later !", redirect: false});
      return;
    }
    db.get('SELECT email FROM users WHERE email = ?', email, (err1, row1) => {
      if (err1) {
        console.error(err1);
        res.json({message: "An error occured, please try later !", redirect: false});
        return;
      }
      if(row){
        res.json({message: "This username is already taken !", redirect: false});
      }
      else if(row1){
        res.json({message: "This email is already taken !", redirect: false});
      }
      else{
        db.run('INSERT INTO users(name, firstname, street, postal_code, city, tel, login, password, birthdate, fk_idrole, email, token) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, firstname, street, postal, city, phone, username, cryptpassword, birthdate, role, email, handleTokenHashing(token, saltRounds)], function(err2){
          if (err2) {
            console.error(err2);
            res.json({message: "An error occured, please try later !", redirect: false});
          }
          else {
            res.json({redirect: true, redirectTo: '/'});
          }
        });
      }
    });
  });
});

module.exports = router;
