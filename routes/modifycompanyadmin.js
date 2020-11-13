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

  let id = req.body.companyId;
  let name = req.body.name;
  let description = req.body.description;
  let email = req.body.email;
  let phone = req.body.phone;
  let city = req.body.city;
  let postal = req.body.postal;
  let street = req.body.street;




        let request = db.run('UPDATE enterprises SET name = ?, description = ?, street = ?, postal_code = ?, city = ?, mail = ?, tel = ? WHERE id = ?', [name, description, street, postal, city, email, phone, id], function(err){
          if(err){
            console.error(err);
            next();
            return;
          }
          res.send(true);
        });


});

module.exports = router;
