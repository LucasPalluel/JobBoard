var express = require('express');
var router = express.Router();
const check = require('./check')
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var randtoken = require('rand-token');


let db = new sqlite3.Database('Project1.db', err => {
  if (err) {
    throw err
  }
});

router.get('/', check.checkAdmin, check.checkConn, function(req, res, next) {
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
    res.render('admin/adduser', {infos: infos});
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
  let role = req.body.select_role;
  let token = randtoken.generate(16);
  let crypttoken = bcrypt.hashSync(token, saltRounds);

  let request = db.run('INSERT INTO users(name, firstname, street, postal_code, city, tel, login, password, birthdate, fk_idrole, email, token) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, firstname, street, postal, city, phone, username, cryptpassword, birthdate, role, email, crypttoken], function(err){
    if(err){
      console.error(err);
      next();
      return;
    }
    res.redirect('/administration');
  });
});

module.exports = router;
