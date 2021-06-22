"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(express.json());
// const getBooksHandler = require('./modules/user');

app.use(cors());

const PORT = process.env.PORT || 3010;
mongoose.connect("mongodb://localhost:27017/books", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const {
  handleDeleteBook,
  getBooksHandler,
  handleAddBook,
} = require('./modules/user');
app.get("/books", getBooksHandler);

//http://localhost:3010/book?email=abed
// server.get('/book', bookHandler)
app.post('/addbook', handleAddBook);
app.delete('/deletebook/:index', handleDeleteBook);

// const {
//   getBooksHandler,
//   handleAddBook,
//   handleDeleteBooks,
// } = require('./modules/user');

//localhost:3010/
app.get("/", homeHandler);
function homeHandler(req, res) {
  res.send("Home Route");
}
// http://localhost:3010/books?email=labushanab14@gmail.com

// app.post('/addbook', handleAddBook);
// app.delete('/deletebook/:index', handleDeleteBooks);


app.listen(PORT || 3010, () => console.log(`listening on ${PORT}`));
