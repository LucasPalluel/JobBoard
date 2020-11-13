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

  db.all('SELECT * FROM users', (err, users) => {
    if(err){
      console.error(err);
      next();
      return;
    }
    if(!users){
      next();
      return;
    }
    db.all('SELECT * FROM enterprises', (err, companies) => {
      if(err){
        console.error(err);
        next();
        return;
      }
      if(!companies){
        next();
        return;
      }
      db.all('SELECT * FROM offers', (err, offers) => {
        if(err){
          console.error(err);
          next();
          return;
        }
        if(!offers){
          next();
          return;
        }
        res.render('admin/administration', {users: users, companies: companies, offers: offers});
      });
    });
  });

});


module.exports = router;
