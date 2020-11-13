var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
var indexRouter = require('./routes/index');
var signinRouter = require('./routes/signin');
var signupRouter = require('./routes/signup');
var addoffersRouter = require('./routes/addoffers')
var logoutRouter = require('./routes/logout');
var profileRouter = require('./routes/profile');
var modifyprofilRouter = require('./routes/modifyprofil');
var applyRouter = require('./routes/apply');
var administrationRouter = require('./routes/administration');
var adduserRouter = require('./routes/adduser');
var addcompanyRouter = require('./routes/addcompany');
var modifyuseradminRouter = require('./routes/modifyuseradmin');
var modifycompanyadminRouter = require('./routes/modifycompanyadmin');
var modifyofferadminRouter = require('./routes/modifyofferadmin');
var deletecompanyRouter = require('./routes/deletecompany');
var deleteuserRouter = require('./routes/deleteuser');
var deleteofferRouter = require('./routes/deleteoffer');
var unconnectedapplyRouter = require('./routes/unconnectedapply');
var changepasswordRouter = require('./routes/changepassword');
var sendmailRouter = require('./routes/sendmail');
var entermailRouter = require('./routes/entermail');
var changepasswordadminRouter = require('./routes/changepasswordadmin');
var forgotpasswordRouter = require('./routes/forgotpassword');
var app = express();

app.use(session({secret: 'secretkey', saveUninitialized:true, resave: false, cookie: {}}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);
app.use('/profile', profileRouter);
app.use('/modifyprofil', modifyprofilRouter);
app.use('/addoffers', addoffersRouter);
app.use('/logout', logoutRouter);
app.use('/apply', applyRouter);
app.use('/administration', administrationRouter);
app.use('/adduser', adduserRouter);
app.use('/addcompany', addcompanyRouter);
app.use('/modifyuseradmin', modifyuseradminRouter);
app.use('/modifycompanyadmin', modifycompanyadminRouter);
app.use('/modifyofferadmin', modifyofferadminRouter);
app.use('/deletecompany', deletecompanyRouter);
app.use('/deleteuser', deleteuserRouter);
app.use('/deleteoffer', deleteofferRouter);
app.use('/changepassword', changepasswordRouter);
app.use('/changepasswordadmin', changepasswordadminRouter);
app.use('/unconnectedapply', unconnectedapplyRouter);
app.use('/sendmail', sendmailRouter);
app.use('/entermail', entermailRouter);
app.use('/forgotpassword', forgotpasswordRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
