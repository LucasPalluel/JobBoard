var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const check = require('./check')

const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('Project1.db', err => {
  if (err) {
    throw err
  }
});



/* GET users listing. */
router.get('/', check.checkUnConn, function(req, res, next) {
  res.render('user/signin')
});
router.post('/', function(req, res, next) {
  let password = req.body.password
  let username = req.body.username
  let result = db.get('SELECT * FROM users WHERE users.login = ?', [username], (err, row) =>  {
    if(!row){
      // alert('Database error');
      res.json({message: "Wrong username or password", redirect: false});
    }
    else{
      bcrypt.compare(req.body.password, row.password, function(err, resu) {
        if (err){
          throw(err)
        }
        if (resu){
        req.session.userId = row.id;
        req.session.idrole = row.fk_idrole;
        res.json({redirect: true, redirectTo: '/'});
      } else {
        // alert('Incorrect username or password');
        res.json({message: "Wrong username or password", redirect: false});
      }
    });
  }
})

});
module.exports = router;
