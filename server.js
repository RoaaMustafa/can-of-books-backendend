'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3010;
mongoose.connect('mongodb://localhost:27017/books', {useNewUrlParser: true, useUnifiedTopology: true});
//localhost:3010/
app.get('/',homeHandler);
function homeHandler(req,res){
  res.send('Home Route');
}

const bookSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
});

const userSchema = new mongoose.Schema({
  email: String,
  books: [bookSchema]
});

const bookModel = mongoose.model('Books', bookSchema);
const userModel = mongoose.model('User', userSchema);
//function for insert  user data (seeding)
function seedBooksCollection (){
  const cleanness = new bookModel({
    name : 'Cleanness',
    description : 'The casual grandeur of Garth Greenwell’s prose, unfurling in page-long paragraphs and elegantly garrulous sentences, tempts the vulnerable reader into danger zones: traumatic memories, extreme sexual scenarios, states of paralyzing heartbreak and loss. In the case of “Cleanness,” Greenwell’s third work of fiction, I initially curled up with the book, savoring the sensuous richness of the writing, and then I found myself sweating a little, uncomfortably invested in the rawness of the scene.',
    status : 'https://media.newyorker.com/photos/5fc53eaac7dac80adfffcceb/master/w_1600%2Cc_limit/TNY-BestBooks2020-Greenwell.jpg'

  })

  const stranger = new bookModel({
    name : 'Stranger Faces ',
    description : 'In an age of totalizing theories, it’s nice to watch someone expertly pull a single idea through a needle’s eye. “Stranger Faces,” by Namwali Serpell, is one such exercise. The book’s catalytic inquiry—“what counts as a face and why?”—means to undermine the face, the way its expressive capabilities give it the cast of truth. ',
    status : 'https://media.newyorker.com/photos/5fc53ead04d5eeb69d5bb23a/master/w_1600%2Cc_limit/TNY-BestBooks2020-Serpell.jpg'

  })

  // console.log(cleanness);
  // console.log(sherry);

  cleanness.save();
  stranger.save();
}
// seedBooksCollection ();

//data seeding
function seedUserCollection (){
  const roaa = new userModel({
      email : 'labushanab14@gmail.com',
      books: [
          {
              name: 'Want',
              description : 'Strong uses the friendship as a tether, returning to it to mark time’s passing; her technique is so sophisticated that the murk of the present and the sharply remembered past hold seamlessly together. Her biggest triumph is the transmission of consciousness. I loved the tense pleasure of staying pressed close to her narrator’s mind, with its beguiling lucidity of thought and rawness of feeling. ',
              status :'https://media.newyorker.com/photos/5fc53ead0013a5ddc52c0dfc/master/w_1600%2Cc_limit/TNY-BestBooks2020-StegerStrong.jpg'
          },
          {
            name : 'Cleanness',
            description : 'The casual grandeur of Garth Greenwell’s prose, unfurling in page-long paragraphs and elegantly garrulous sentences, tempts the vulnerable reader into danger zones: traumatic memories, extreme sexual scenarios, states of paralyzing heartbreak and loss. In the case of “Cleanness,” Greenwell’s third work of fiction, I initially curled up with the book, savoring the sensuous richness of the writing, and then I found myself sweating a little, uncomfortably invested in the rawness of the scene.',
            status : 'https://media.newyorker.com/photos/5fc53eaac7dac80adfffcceb/master/w_1600%2Cc_limit/TNY-BestBooks2020-Greenwell.jpg'
        
          }
      ]

  })

  roaa.save();

}
// seedUserCollection ();
// http://localhost:3010/books?email=labushanab14@gmail.com
app.get('/books', getBooksHandler);
function getBooksHandler(req,res){
  let requestedUserEmail = req.query.email;
  userModel.find({email:requestedUserEmail },function(err,userData){
      if(err){
          console.log('something went wrong');
      }
      else
      {
          console.log(userData[0].books);
          res.send(userData[0].books);
      }
  });
}

app.listen(PORT||3010, () => console.log(`listening on ${PORT}`));
