
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const APIroutes = require("./routes");
const app = express();
var session = require('express-session')
const axios = require("axios");
const PORT = process.env.PORT || 3001;
require('dotenv').config();

// app.listen(process.env.PORT || 3000, function(){
//   console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
// });

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("public"));
}

console.log("google places", process.env.GOOGLE_PLACES_API_KEY)

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}))

// Add routes, both API and view
app.use(APIroutes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/bagsdb");


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});