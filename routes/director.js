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

module.exports = router;
