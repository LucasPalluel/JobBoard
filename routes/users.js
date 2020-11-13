var express = require('express');
var router = express.Router();



const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('Project1.db', err => {
  if (err) {
    throw err
  }
});



/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('user/signup')
});
router.post('/signup', function(req, res, next) {
  let username = req.body.username
  let password = req.body.password
  res.send(username, password)

});
module.exports = router;
