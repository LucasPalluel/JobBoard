var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3');
const check = require('./check')


let db = new sqlite3.Database('Project1.db', err => {
  if (err) {
    throw err
  }
});

router.put('/',check.checkAdmin, check.checkConn, function(req, res, next){

  let id = req.body.userId;
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




        let request = db.run('UPDATE users SET name = ?, firstname = ?, street = ?, postal_code = ?, city = ?, tel = ?, login = ?, birthdate = ?, email = ? WHERE id = ?', [name, firstname, street, postal, city, phone, username, birthdate, email, id], function(err){
          if(err){
            console.error(err);
            next();
            return;
          }
          res.send(true);
        });


});

module.exports = router;
