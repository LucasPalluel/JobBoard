var express = require('express');
var router = express.Router();
const check = require('./check')
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('Project1.db', err => {
  if (err) {
    throw err
  }
});



/* GET users listing. */
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
    db.all("SELECT * FROM application WHERE fk_users = ?", [userId], function(err, eq){
      if(err){
        console.error(err);
        next();
        return;
      }
      if(!eq){
        next();
        return;
      }
      res.render('user/profile', {login: login, name: name, firstname: firstname, email: email, tel: tel, street: street, city: city, postal: postal, birthdate: birthdate, applys: eq});
    });
  });
});

module.exports = router;
