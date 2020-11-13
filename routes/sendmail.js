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
router.get('/', check.checkUnConn, function(req, res, next) {



    res.render('user/sendmail');

});

module.exports = router;
