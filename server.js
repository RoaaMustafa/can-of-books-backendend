"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const getBooksHandler = require('./modules/user');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3010;
mongoose.connect("mongodb://localhost:27017/books", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//localhost:3010/
app.get("/", homeHandler);
function homeHandler(req, res) {
  res.send("Home Route");
}

// http://localhost:3010/books?email=labushanab14@gmail.com
app.get("/books", getBooksHandler);

app.listen(PORT || 3010, () => console.log(`listening on ${PORT}`));
