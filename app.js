//jshint esversion:8
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
app.use(express.static("public"));
// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({
  extended: true
}));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

/*-------------------------------------------*/

/*-----------------------------------------*/ 
app.get("/superMarket", function(req, res){
    res.render("superMarket");
});

app.get("/ourStory", function(req, res){
    res.render("ourStory");
});
//------------------- product pages --------------//
app.get("/product1", function(req, res){
    res.render("supermarketFlavours/product1");
});
app.get("/product2", function (req, res) {
    res.render("supermarketFlavours/product2");
});
app.get("/product3", function (req, res) {
    res.render("supermarketFlavours/product3");
});
app.get("/product4", function (req, res) {
    res.render("supermarketFlavours/product4");
});
app.get("/product5", function (req, res) {
    res.render("supermarketFlavours/product5");
});
app.get("/product6", function (req, res) {
    res.render("supermarketFlavours/product6");
});
app.get("/contactUs", function(req, res){
    res.render("contactUs");
});
//------------------------------------------------//
