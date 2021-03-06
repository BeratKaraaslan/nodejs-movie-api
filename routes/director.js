const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Director = require('../models/Director');

router.post('/new', (req, res, next) => {
  const director = new Director (req.body);
  director.save()
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

router.get('/', (req, res) => {
  const promise = Director.aggregate([
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
      }
    },
    {
      $unwind : {
        path: '$movies',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
        _id: '$_id',
        name: '$name',
        surname: '$surname',
        bio: '$bio'
      },
      movies: {
        $push: '$movies'
      }
    }
  },
  {
    $project: {
      _id: '$_id._id',
      name: '$_id.name',
      surname: '$_id.surname',
      movies: '$movies'
    }
  }
  ]);

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/:director_id', (req, res) => {
  const promise = Director.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.director_id)
      }
    },
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
      }
    },
    {
      $unwind : {
        path: '$movies',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
        _id: '$_id',
        name: '$name',
        surname: '$surname',
        bio: '$bio'
      },
      movies: {
        $push: '$movies'
      }
    }
  },
  {
    $project: {
      _id: '$_id._id',
      name: '$_id.name',
      surname: '$_id.surname',
      movies: '$movies'
    }
  }
  ]);


    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
  });
module.exports = router;
