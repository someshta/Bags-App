require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const APIroutes = require("./routes");
const app = express();
var session = require('express-session')
const axios = require("axios");
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}



app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}))

// Add routes, both API and view
app.use('/api', APIroutes);

app.use('*', function(req,res){
  res.sendFile("index.html", {root: __dirname + "/client/build"})
})
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/bagsdb");


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

