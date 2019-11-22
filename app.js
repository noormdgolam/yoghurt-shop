//jshint esversion:8
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const override = require("method-override");
const app = express();
const users = [];
// const mongoose = require("mongoose");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.get("/", function(req, res){
    res.render("main");
});
const initializePassport = require("./passport-config");
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    save: false,
    saveUninitialized: false
  })
);
app.use(override("_method"));
app.use(passport.initialize());
app.use(passport.session());

app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

app.get("/register", canNotGoBackIfLoggedIn, (req, res) => {
  res.render("register");
});
app.get("/login", canNotGoBackIfLoggedIn, (req, res) => {
  res.render("login");
});

app.get("/user", canNotGoToUserWithOutLogIn, (req, res) => {
  res.render("user", { users: users });
});
app.post(
  "/login",
  canNotGoBackIfLoggedIn,
  passport.authenticate("local", {
    successRedirect: "/user",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: true
  })
);
app.post("/register", canNotGoBackIfLoggedIn, async (req, res) => {
  try {
    const hashPass = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashPass
    });
    res.redirect("/login");
  } catch (error) {
    res.redirect("/register");
  }
});

function canNotGoToUserWithOutLogIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function canNotGoBackIfLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/user");
  }
  next();
}
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
app.get("/register", function(req, res){
    res.render("register");
});
app.get("/login", function(req, res){
    res.render("login");
});
//------------------------------------------------//
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function(){
    console.log("The server has started on port 3000");
});