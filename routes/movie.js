const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router.post('/new', (req, res, next) => {
  const movie = new Movie (req.body);
  movie .save()
    .then(data => {
    console.log(data);
    res.status(201).json(data);
    })
    .catch(err=> {
    console.log(err);
    res.status(500).json({
    error: err
    })
  });
});

// Top 10 list
router.get('/top10', (req, res) => {
  const promise = Movie.find({ }).limit(10).sort({ imdb_score: -1 });
  promise.then((data) => {
    res.json((data));
  }).catch((err) => {
    res.json(err);
  })
});

router.get('/', (req, res) => {
  const promise = Movie.find({ });
  promise.then((data) => {
    res.json((data));
  }).catch((err) => {
    res.json(err);
  })
});

router.get('/:movie_id', (req, res, next) => {
  const promise = Movie.findById(req.params.movie_id);

  promise.then((movie) => {
    if(!movie)
      next ({ message: 'The movie was not found' });

    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

router.put('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndUpdate(
    req.params.movie_id,
    
{    
  director_id: '620b5c53c5f1ef8cfa0bd836'
});

  promise.then((movie) => {
    if(!movie)
      next ({ message: 'The movie was not found' });

    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

router.delete('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndDelete(
    req.params.movie_id,
    {
      new: true
    }
  );
  promise.then((movie) => {
    if(!movie)
      next ({ message: 'The movie not found'});

    res.json('Silme işlemi yapıldı.');
  }).catch((err) => {
    res.json(err);
  });
});
// Between
router.get('/between/:start_year/:end_year', (req, res) => {
  const { start_year, end_year } = req.params ;
  const promise = Movie.find(
    {
      year: { "$gte": parseInt(start_year), "$lte": parseInt(end_year) }
    }
     ).sort({year: 1});

  promise.then((data) => {
    res.json(data);
  }).catch((err) =>{
    res.json(err);
  });
});


module.exports = router;
