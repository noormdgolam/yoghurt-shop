const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// const mongoose = require("mongoose");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("main");
});

app.get("/superMarket", function(req, res){
    res.render("superMarket");
});
app.get("/product1", function(req, res){
    res.render("product1");
});


app.listen(3000, function(){
    console.log("The server has started on port 3000");
});