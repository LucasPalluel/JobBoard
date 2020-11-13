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
  db.all('SELECT * FROM enterprises', (err, infos) => {
    if(err){
      console.error(err);
      next();
      return;
    }
    if(!infos){
      next();
      return;
    }
      res.render('admin/addoffers', {infos: infos});
  });
});
router.post('/add', function(req, res, next){
  let name = req.body.name;
  let description = req.body.description;
  let description_full = req.body.description_full;
  let value = req.body.select_enterprise;
  let request = db.run('INSERT INTO offers (name, description, fk_identerprise, description_full) VALUES(?,?,?,?)', [name, description, value, description_full], function(err){
    if(err){
      console.error(err);
      next();
      return;
    }
    res.redirect('/administration');
  });
});

module.exports = router;
