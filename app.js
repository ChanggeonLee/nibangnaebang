var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('connect-flash');
var methodOverride = require('method-override');
var passport = require('passport');
var bodyParser = require('body-parser');

// router require
var indexRouter = require('./routes/index');
var recipeRouter = require('./routes/recipe');
var rentRouter = require('./routes/rent');
var userRouter = require('./routes/user');
var reviewRouter = require('./routes/review');
var apiRouter = require('./routes/api')

// require passportconfig
var passportConfig = require('./lib/passport-config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// html예쁘게 출력
//if (app.get('env') == 'development') {
app.locals.pretty = true;  
//}

// mongodb connect
mongoose.Promise = global.Promise; // ES6 Native Promise를 mongoose에서 사용한다.
// const connStr = process.env.MONGOURL;
const connStr = 'mongodb://localhost/test';
mongoose.connect(connStr);
mongoose.connection.on('error', console.error);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// _method를 통해서 method를 변경할 수 있도록 함. PUT이나 DELETE를 사용할 수 있도록.
app.use(methodOverride('_method', {methods: ['POST', 'GET']}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, '/public'),
  dest: path.join(__dirname, '/public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/rent',express.static(path.join(__dirname, 'public')));
// app.use('/event',express.static(path.join(__dirname, 'public')));

// session을 사용
app.use(session({
  name: 'mjoverflow',
  resave: true,
  saveUninitialized: true,
  secret: 'long-longlonglong123asdasdaszxcasdq1123123sdasdlkjlkjaflkvna;ls123'
}));

app.use(flash()); // flash message를 사용할 수 있도록

//=======================================================
// Passport 초기화
//=======================================================
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

// pug의 local에 현재 사용자 정보와 flash 메시지를 전달하자.
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;  // passport는 req.user로 user정보 전달
  res.locals.flashMessages = req.flash();
  next();
});

//Route
app.use('/', indexRouter);
app.use('/recipe', recipeRouter);
app.use('/rent', rentRouter);
app.use('/user', userRouter);
app.use('/review', reviewRouter);
app.use('/api', apiRouter);
require('./routes/auth')(app, passport);


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
