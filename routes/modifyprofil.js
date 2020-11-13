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
  const userId = req.session.userId;
  let result = db.get('SELECT * FROM users WHERE users.id = ?', [userId], (err, row) =>  {
    if(err){
      console.error(err);
      next();
      return;
    }
    if(!row){
      next();
      return;
    }
    let login = row.login;
    let name = row.name;
    let firstname = row.firstname;
    let email = row.email;
    let tel = row.tel;
    let street = row.street;
    let city = row.city;
    let postal = row.postal_code;
    let birthdate = row.birthdate;
    res.render('user/modifyprofil', {login: login, name: name, firstname: firstname, email: email, tel: tel, street: street, city: city, postal: postal, birthdate: birthdate});
  });
});

router.post('/', function(req, res, next){
  const userId = req.session.userId;
  let username = req.body.username;
  let name = req.body.name;
  let firstname = req.body.firstname;
  let email = req.body.email;
  let confirmemail = req.body.confirmemail;
  let phone = req.body.phone;
  let birthdate = req.body.birthdate;
  let city = req.body.city;
  let postal = req.body.postal;
  let street = req.body.street;

        let request = db.run('UPDATE users SET name = ?, firstname = ?, street = ?, postal_code = ?, city = ?, tel = ?, login = ?, birthdate = ?, email = ? WHERE id = ?', [name, firstname, street, postal, city, phone, username, birthdate, email, userId], function(err){
          if(err){
            console.error(err);
            next();
            return;
          }
          res.redirect('/profile');
        });
});

module.exports = router;
