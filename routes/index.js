const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
//Models
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { hash } = require('collections/shim-object');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res, next) => {
  const { username, password } = req.body;

  bcryptjs.hash(password, 10).then((hash) => {
    const user = new User({
      username,
      password: hash
    });

  const promise = user.save();
  promise.then((user) => {
    res.json(user)
  }).catch((err) => {
    res.json(err);
  })
});
});

router.post('/authenticate', (req, res) => {
  const { username, password }= req.body;

  User.findOne({
    username
  }, (err, user) => {
    if(err)
      throw err;

    if(!user){
      res.json({
        status: false,
        message: 'Authentication failed, user not found.'
      });
    } else{
      bcryptjs.compare(password, user.password).then((result) => {
        if(!result){
          res.json({
            status: false,
            message: 'Authentication failed, user not found.'
          });
        } else {
          const payload = {
            username
          };
          const token = jwt.sign(payload, req.app.get('api_secret_key'), {
            expiresIn: 720 // 12 saat
          });

          res.json({
            status: true,
            token
          });
        }
      });
    }
  });
});

module.exports = router;
