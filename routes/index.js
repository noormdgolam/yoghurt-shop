//jshint esversion:8
const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/User');
// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('main'));

// Dashboard
router.get('/user', ensureAuthenticated, (req, res) =>
  res.render('user', {
    user: req.user
  })
);
router.post("/delete", (req, res) => {
  const deleteItem = req.body.id;
  User.findByIdAndDelete(deleteItem, (err) => {
    if (!err) {
      console.log("Successfully deleted");
      console.log(deleteItem);
      
      res.redirect("/users/login");
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
