const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const check = require('./check')
let db = new sqlite3.Database('Project1.db', err => {
  if (err) {
    throw err
  }
});


router.delete('/', check.checkAdmin, check.checkConn, function(req, res, next) {

  let id = req.body.userId;

  db.run('DELETE FROM users WHERE id= ?', [id], function(err){
    if(err){
      console.error(err);
      next();
      return;
    }
    res.json({redirectTo : '/administration'})
  });


});

module.exports=router;
