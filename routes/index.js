var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('Project1.db', err => {
  if (err) {
    throw err
  }
});

router.get('/', function(req, res, next) {
  const userId = req.session.userId;
  const isAdmin = req.session.idrole;
  db.all('SELECT o.id, e.name, e.description as descr, o.name offername, o.description FROM enterprises e JOIN offers o ON e.id = o.fk_identerprise', (err, jobs) => {
    if(err){
      console.error(err);
      next();
      return;
    }
    if(!jobs){
      next();
      return;
    }
    res.render('index', {jobs: jobs, userId: userId, isAdmin: isAdmin});
  });
});

router.get('/:job_id', function(req, res, next) {
  let job_id = parseInt(req.params.job_id);
  if (isNaN(job_id))
    return next();
  db.get('SELECT description_full FROM offers WHERE id = ?',job_id , (err, description) => {
    if(err){
      console.error(err);
      next();
      return;
    }
    if(!description){
      next();
      return;
    }

    res.send(description);
  });
});


module.exports = router;
