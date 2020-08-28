const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

var companies = [];
var stocks = [];
var boughtPrices = [];

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

// Connecting mongodb to application

mongoose.connect("mongodb://localhost:27017/platformDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Database data schema

const dataSchema = {
  companyName: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  boughtPrice: {
    type: Number,
    required: true,
  },
  calculation: {
    type: Number,
  },
};

const Person = mongoose.model("Person", dataSchema);

app.get("/", function (req, res) {
  Person.find({}, function (err, foundData) {
    res.render("index", {
      newCompanies: foundData,
      newStocks: foundData,
      newBoughtPrices: foundData,
      newCalculations: foundData
    });
  });
});

app.post("/", function (req, res) {
  var company = req.body.newCompanies;
  var stock = req.body.newStocks;
  var boughtPrice = req.body.newBoughtPrices;
  
  boughtPrices.push(boughtPrice);
  stocks.push(stock);
  companies.push(company);

  // Ading data to database

  const data = new Person({
    companyName: company,
    stock: stock,
    boughtPrice: boughtPrice,
  });

  data.save();

  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server up and running");
});