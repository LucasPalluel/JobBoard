var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3');
const check = require('./check')
const bcrypt = require('bcrypt');
const saltRounds = 10;


let db = new sqlite3.Database('Project1.db', err => {
  if (err) {
    throw err;
  }
});
router.get('/:jobId', check.checkUnConn, function(req, res, next){
  const id_offer = req.params.jobId;
  db.get("SELECT fk_identerprise, description FROM offers WHERE id = ?", [id_offer], (err, row) => {
    if(err){
      console.error(err);
      next();
      return;
    }
    if(!row){
      next();
      return;
    }
    const fkvalues = row.fk_identerprise;
    const description = row.description;
    db.get("SELECT name FROM enterprises WHERE id = ?",[fkvalues], (err, val) => {
      if(err){
        console.error(err);
        next();
        return;
      }
      if(!val){
        next();
        return;
      }
      const enterprisename = val.name;
      res.render('unconnectedapply', {fkvalue: fkvalues, description: description, enterprise: enterprisename, jobid: id_offer});
    });
  });
});
router.post('/:jobId/send', function(req, res, next){
  const id_offer = req.params.jobId;
  db.get("SELECT fk_identerprise, description, name FROM offers WHERE id = ?", [id_offer], (err, row) => {
    if(err){
      console.error(err);
      next();
      return;
    }
    if(!row){
      next();
      return;
    }
    let fkvalues = row.fk_identerprise;
    let descriptions = row.description;
    let nameoffer = row.name;
    db.get("SELECT name, mail FROM enterprises WHERE id = ?", [fkvalues], (err, val) => {
      if(err){
        console.error(err);
        next();
        return;
      }
      if(!val){
        next();
        return;
      }
      let enterprisename = val.enterprisename;
      let mail = val.mail;
      let mail_content = req.body.content;
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0');
      let yyyy = today.getFullYear();
      today = dd + '-' + mm + '-' + yyyy;
      let name = req.body.name;
      let firstname = req.body.firstname;
      let emailuser = req.body.email;
      let phone = req.body.phone;
      let birthdate = req.body.birthdate;
      let city = req.body.city;
      let postal = req.body.postal;
      let street = req.body.street;

      db.run("INSERT INTO unconnectapplications(name, firstname, tel, email, street, postal_code, city, birthdate, content, offer_description, date, fk_identerprise) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [name, firstname, phone, emailuser, street, postal, city, birthdate, mail_content, descriptions, today, fkvalues], function(err){
        if(err){
          console.error(err);
          next();
          return;
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
          text: 'Confirmation of application for the offer : ' + nameoffer + '. Content sent : '+ mail_content
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
