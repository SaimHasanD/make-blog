var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { engine } = require('express-handlebars')
const fileUpload = require('express-fileupload');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin/index');
var aboutRouter = require('./routes/admin/about');
var blogRouter = require('./routes/admin/blog');
var contactRouter = require('./routes/admin/contact-us');
var linkRouter = require('./routes/admin/link');
var teamRouter = require('./routes/admin/team');
var testimonialRouter = require('./routes/admin/testimonial');
require('./config/database');


var app = express();
//file upload
app.use(fileUpload());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('.hbs', engine(
  {
    extname: '.hbs',
    defaultView: 'frontend/index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'frontend/layout.hbs',
    partialDir: __dirname + '/views/partials'
  }
))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/admin/about', aboutRouter);
app.use('/admin/blog', blogRouter);
app.use('/admin/contact-us', contactRouter);
app.use('/admin/link', linkRouter);
app.use('/admin/team', teamRouter);
app.use('/admin/testimonial', testimonialRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
