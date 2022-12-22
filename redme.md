Passport.js
--------------------------------------------
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

var User=require('../models/User');
const {checkPassword} = require('../lib/passwordValid');

passport.serializeUser((user, done) =>{
  done(null, user.id);
});

passport.deserializeUser((id, done) =>{
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findByUsername(username, (err, user) => {
      // console.log(user.hash_salt())
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!checkPassword(password, user.password, user.salt)) {
        return done(null, false);
      } //bug
      return done(null, user);
    });
  }));
  
  
  
  ---------------------------------------------
  app.js
  -------------------------------------
  
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {engine}=require('express-handlebars');
const fileUpload = require('express-fileupload');
const helpers=require('./lib/helper');
var passport = require("passport"),
    session = require('express-session');
require('./config/passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
require('./config/database');

const {SECRATE} =require('./config/index');

var app = express();
//file upload
app.use(fileUpload());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('.hbs', engine(
  {
    extname: '.hbs',
    defaultView:'frontend/index',
    layoutsDir:__dirname+'/views/layouts',
    defaultLayout:'frontend/layout',
    partialsDir:__dirname+'/views/partials',
    helpers:helpers
  }
));


// / passport setup
//set passport session
app.use(session({
  name: 'secrate-session',
  secret: SECRATE,
  saveUninitialized: true,
  resave: true,
  cookie:{
    maxAge:1000*60*60*24
  }
}));


//passport initialize
app.use(passport.initialize()); 
app.use(passport.session()); 



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.get("*",(rea,res)=>{
  res.json({error:"Page not found"});
})

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

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port`)
})
 
module.exports = app;


----------------------
login.hbs

-----------------------

    <div class="container">

    <section class="section dashboard px-5">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">LOGIN</h5>

              <!-- Floating Labels Form -->
              <form class="row g-3 h-100" method="POST" action="/admin/blog/store" encType="multipart/form-data">
                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control form-control-sm" id="floatingName" placeholder="username" name="username">
                    <label for="floatingName">Username</label>
                    <b class="text-danger">
                      {{errors.username.msg}}
                    </b>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="password" class="form-control form-control-sm" id="floatingName" placeholder="password" name="password">
                    <label for="floatingName">Password</label>
                    <b class="text-danger">
                    {{errors.password.msg}}
                    </b>
                    
                  </div>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-primary">Submit</button>
                  <button type="reset" class="btn btn-secondary">Reset</button>
                </div>
              </form><!-- End floating Labels Form -->

            </div>
          </div>
    </section>
    </div>

    <style>
        .card{
            background-color: #000e34;
    box-shadow: 10px 12px 16px 0px #1150795e;
    border-color: #ffffff00;
    max-width: 500px;
    min-height: 350px;
        }

        section{
                justify-content: center;
    /* align-items: center; */
    display: flex;
        }
    .card-title{
    color: aliceblue;
    font-family: cursive;
    text-align: center;
    margin-bottom: 25px!important;
        }
    </style>


------------------------
register.hbs
---------------

    <div class="container">

    <section class="section dashboard px-5">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">REGISTER</h5>

              <!-- Floating Labels Form -->
              <form class="row g-3 h-100" method="POST" action="/admin/blog/store" encType="multipart/form-data">
                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control form-control-sm" id="floatingName" placeholder="username" name="username">
                    <label for="floatingName">Username</label>
                    <b class="text-danger">
                      {{errors.username.msg}}
                    </b>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="password" class="form-control form-control-sm" id="floatingName" placeholder="password" name="password">
                    <label for="floatingName">Password</label>
                    <b class="text-danger">
                    {{errors.password.msg}}
                    </b>
                    
                  </div>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-primary">Submit</button>
                  <button type="reset" class="btn btn-secondary">Reset</button>
                </div>
              </form><!-- End floating Labels Form -->

            </div>
          </div>
    </section>
    </div>

    <style>
        .card{
            background-color: #000e34;
    box-shadow: 10px 12px 16px 0px #1150795e;
    border-color: #ffffff00;
    max-width: 500px;
    min-height: 350px;
        }

        section{
                justify-content: center;
    /* align-items: center; */
    display: flex;
        }
    .card-title{
    color: aliceblue;
    font-family: cursive;
    text-align: center;
    margin-bottom: 25px!important;
        }
    </style>
=-------------------------------
route 
user.js
--------------------
var express = require('express');
var router = express.Router();
const userController=require('../controlers/auth/UserController');

/* GET users listing. */
router.get('/login', userController.login);
// router.post('/login', userController.post_login);
router.get('/register', userController.register);
// router.post('/register', userController.post_register);
// router.post('/logout', userController.logout);

module.exports = router;
--------------------------
controller.
usercontroll
------------masum cor


var mongoose  = require('mongoose');
var passport = require("passport");

const {genPassword}=require('../../lib/passwordValid');

var User=mongoose.model('User');
const { check, validationResult } = require('express-validator');

module.exports = {
    //login
    login (req,res,next){
        res.render('forntend/auth/login', {title: 'Blog | Login' });
    },
    //login post
    // post_login (req,res,next){
    //     const errors=validationResult(req);
    //     var data=req.body;
    //     if(!errors.isEmpty()){
    //         res.send({errors:errors.mapped(),formdata:data});
    //     }else{
    //         passport.authenticate('local')(req, res, () => {
    //             User.findOne({
    //               username: req.body.username
    //             }, (err, person) => {
    //               if(err){
    //                 return res.json({
    //                   status: 'Login Failed!'
    //                 });
    //               }
    //               return res.json({
    //                 success: true,
    //                 status: 'Login Successful!',
    //                 user:person
    //               });
    //             });
    //           })
    //     }
        
    // },
    //register
    register (req,res,next){
        res.render('forntend/auth/register', {title: 'ecom | Registration' });
    },
    //register post
    async post_register (req,res,next){
        const errors=validationResult(req);
        var data=req.body;
        if(!errors.isEmpty()){
            res.send({errors:errors.mapped(),formdata:data});
        }else{
            var newUser=new User({
                username:req.body.username,
                // type:req.body.type,
                email:req.body.email,
                contact:req.body.contact,
                password:genPassword(req.body.password),
                // slug:slugify(req.body.username)
            });
            await User.register(newUser,req.body.password,function(err,user){
                if(err){
                    return res.status(500).json({message:"error during data insertion:",err});
                }
                console.log("data inserted");
                passport.authenticate('local')(req, res, (err) => {
                  if(err){
                    return res.json({message:"Authentication failed"});
                  }
                  return res.status(201).json({success: "Autheticated"});
                });
            });
        }

    },
    //logout
    // logout (req,res,next){
    //     if (req.isAuthenticated()) {
    //       req.logout();
    //       req.session.destroy((err) => {
    //         if (err) {
    //           console.log(err);
    //         } else {
    //           res.clearCookie('session-id');
    //           res.json({
    //             message: 'You are successfully logged out!'
    //           });
    //         }
    //       });
    //     } else {
    //       var err = new Error('You are not logged in!');
    //       err.status = 403;
    //       next(err);
    //     }
    //     // req.logout();
    //     // res.status(200).send({message:'User Logged Out'})
    // }
}