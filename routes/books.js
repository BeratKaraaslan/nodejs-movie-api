const express = require('express');
const { remove } = require('../models/Book');
const router = express.Router();

//Models
const Book = require ('../models/Book');

router.post('/new', (req, res, next) => {
  const book = new Book ({
    title: 'Udemy',
    published: false,
    comments: [
        {message: "harika bir kitap."},
        {message: "Ben pek beğenmedim."}],
      meta: {
        votes: 12,
        favs: 104
      }
  });

  book.save((err, data) => {
    if(err)
      console.log(err);

    res.json(data);
  });
});
//Sorgu Yapmak Find
router.get('/search', (req, res) => {
    Book.find ({ published: false }, 'title comments', (err, data) => {
      res.json(data);
    });
});
//Tekil sorgu yapmak (findOne)
router.get('/searchOne', (req, res) => {
  Book.findOne({ title: "Udemy" }, (err, data) => {
      res.json(data);
  });
});
//ID bazlı sorgu yapmak (findById)
router.get('/searchById', (req, res) => {
  Book.findById('6204bbfe1397bc72e3896feb', (err, data) => {
      res.json(data);
  });
});

router.put('/update', (req, res) => {
    Book.update(
      {
          published: false
      },
      { 
          published: false,
          title: 'upsert anahtar kelimesi'
      },
      {
        //multi: false
        upsert: true
      },
      (err, data) => {
          res.json(data);
        });
});

router.put('/updateById', (req, res) => {
    Book.findByIdAndUpdate(
      '6204bbf41397bc72e3896fe7',
    {
        //title: 'hello word'
        meta: {
          favs: 222
        }
    },
    (err, data) => {
        res.json(data);
    });
});

/*
*findOne() -> remove() önceden işlem yapılacaksa kullanılır
*findOneAndRemove() bulduğu ilk dosyayı siler
*remove() hepsini siler
*/

router.delete('/remove', (req, res) => {
    Book.findById('6204bbf41397bc72e3896fe7', (err, book) => {

      book.remove((err,data) => {
        res.json(book);
      });
    });
});

module.exports = router;
