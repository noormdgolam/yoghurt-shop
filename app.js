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
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function(){
    console.log("The server has started on port 3000");
});