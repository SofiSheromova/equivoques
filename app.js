const createError = require('http-errors');
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const themeRouter = require('./routes/theme');
const categoryRouter = require('./routes/category');
const taskRouter = require('./routes/task');
const standardCardRouter = require('./routes/standard-card');
const equivoquesCardRouter = require('./routes/equivoques-card');

const app = express();

const setUpMongooseConnection = require('./database');
setUpMongooseConnection();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

if (app.get('env') === 'development') {
  app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/theme', themeRouter);
app.use('/category', categoryRouter);
app.use('/task', taskRouter);
app.use('/standardcard', standardCardRouter);
app.use('/equivoquescard', equivoquesCardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  const message = err.message;
  const error = req.app.get('env') === 'development' ? err : undefined;

  // render the error page
  res.status(err.status || 500);
  res.render('error', {message, error});
});

module.exports = app;
