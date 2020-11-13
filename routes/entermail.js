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

    res.render('user/entermail');

});
router.post('/', function(req, res, next){
  let email = req.body.email;
  console.log(email)
  db.get('SELECT token, email FROM users WHERE email = ?', email, (err, row) => {
    if (err) {
      console.error(err);
      res.json({message: "An error occured, please try later !", redirect: false});
      return;
    }
    if(row){
      res.json({redirect: true, redirectTo: '/sendmail'});
      let token = row.token;
      var nodemailer = require('nodemailer');

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'pawnjobssender@gmail.com',
          pass: 'Pawnjob123*'
        }
      });

      var mailOptions = {
        from: 'pawnjobssender@gmail.com',
        to: email,
        subject: 'Reset Password',
        html: `<p>Click this link to reset your password : <a href="localhost:3000/forgotpassword/${token}">Here</a> or copy and paste this adress : localhost:3000/forgotpassword/${token}</p>`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
    else {
      res.json({message: "This email adress doesn't exist !", redirect: false});
    }
  });
});

module.exports = router;
