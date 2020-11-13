var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3');
const check = require('./check')
let db = new sqlite3.Database('Project1.db', err => {
  if (err) {
    throw err
  }
});

router.get('/:jobId', check.checkConn, function(req, res, next) {
  const userId = req.session.userId;
  const id_offer = req.params.jobId;
  db.get("SELECT fk_identerprise, description FROM offers WHERE id = ?", [id_offer], (err, val) => {
    if(err){
      console.error(err);
      next();
    }
    const fkvalues = val.fk_identerprise;
    const descriptions = val.description;
    db.get("SELECT u.name AS username, e.name AS enterprisename FROM users AS u, enterprises AS e WHERE u.id = ? AND e.id = ?", [userId, fkvalues], (err, names) => {
      if(err){
        throw err;
      }
      const usernames = names.username;
      const enterprisenames = names.enterprisename;
      res.render('apply', {userId: userId, fkvalues: fkvalues, description: descriptions, username: usernames, enterprise: enterprisenames, jobid: id_offer});
    });
  });
});

router.post('/:jobId/send', check.checkConn, function(req, res, next){
  const userId = req.session.userId;
  const id_offer = req.params.jobId;
  db.get("SELECT fk_identerprise, description, name FROM offers WHERE id = ?", [id_offer], (err, val) => {
    if(err){
      throw err;
    }
    let fkvalues = val.fk_identerprise;
    let descriptions = val.description;
    let nameoffer = val.name;
    db.get("SELECT u.name AS username, u.email AS emailuser, e.name AS enterprisename, e.mail FROM users AS u, enterprises AS e WHERE u.id = ? AND e.id = ?", [userId, fkvalues], (err, names) => {
      if(err){
        throw err;
      }
      let usernames = names.username;
      let enterprisenames = names.enterprisename;
      let mail = names.mail;
      let emailuser = names.emailuser;
      let mail_content = req.body.content;
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0');
      let yyyy = today.getFullYear();

      today = dd + '-' + mm + '-' + yyyy;

      db.run("INSERT INTO application(name_user, name_enterprise, mail_content, fk_users, fk_offers, offers_description, date) VALUES (?, ?, ?, ?, ?, ?, ?)",[usernames, enterprisenames, mail_content, userId, id_offer, descriptions, today] ,function(err){
        if(err){
          throw err;
        }
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
          to: mail + ', ' + emailuser,
          subject: 'New applier',
          text:'Confirmation of application for the offer : ' + nameoffer + '. Content sent : '+ mail_content
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        res.redirect('/');
      });
    });
  });
});

module.exports = router;
