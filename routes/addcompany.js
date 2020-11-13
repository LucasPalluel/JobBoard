var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3');
const check = require('./check')

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
    res.render('admin/addcompany', {infos: infos});
  });
});
router.post('/', function(req, res, next){
  let name = req.body.name;
  let description = req.body.description;
  let email = req.body.email;
  let confirmemail = req.body.confirmemail;
  let phone = req.body.phone;
  let city = req.body.city;
  let postal = req.body.postal;
  let street = req.body.street;

    if(email == confirmemail){
        let request = db.run('INSERT INTO enterprises(name, description, street, postal_code, city, mail, tel) VALUES(?, ?, ?, ?, ?, ?, ?)',[name, description, street, postal, city, email, phone], function(err){
          if(err){
            console.error(err);
            next();
            return;
          }
          res.redirect('/administration');
        });
    }else{
      res.redirect('/addcompany');
    }
});

module.exports = router;
