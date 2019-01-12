const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require('mongoose');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define API routes here

const books = require('./routes/api/books')
const db = require('./config/keys').mongoURI;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks")

app.use('/api/books', books);
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
