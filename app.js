var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter  = require('./routes/home');
var assessmentRouter = require('./routes/assessment');
var recipeRouter = require('./routes/recipe');
var shoppingRouter = require('./routes/shopping');
var authRouter = require('./routes/auth');

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
const connStr = 'mongodb://localhost/test';
// const connStr = process.env.MONGOURL;
// 아래는 mLab을 사용하는 경우의 예: 본인의 접속 String으로 바꾸세요.
// const connStr = 'mongodb://dbuser1:mju12345@ds113825.mlab.com:13825/sampledb1';
mongoose.connect(connStr);
mongoose.connection.on('error', console.error);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/home', homeRouter);
app.use('/assessment', assessmentRouter);
app.use('/recipe', recipeRouter);
app.use('/shopping',shoppingRouter);
app.use('/auth',authRouter);


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
