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

  let id = req.body.offerId;
  let offer = req.body.offer;
  let description = req.body.description;
  let description_full = req.body.description_full;
  let value = req.body.select_enterprise;

  let request = db.run('UPDATE offers SET name = ?, description = ?, fk_identerprise = ?, description_full = ? WHERE id = ?', [offer, description, value, description_full, id], function(err){
    if(err){
      console.error(err);
      next();
      return;
    }
    res.send(true);
  });


});

module.exports = router;
