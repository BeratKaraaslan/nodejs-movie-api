const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const movieRouter = require('./routes/movie');
const directorRouter = require('./routes/director');

const app = express();

// const db = require('./helper/db.js')();

//Config
const config = require('./config');
app.set('api_secret_key', config.api_secret_key);

//Middleware
const verifyToken = require('./middleware/verify-token');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', verifyToken);
app.use('/api/movies', movieRouter);
app.use('/directors', directorRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      code: err.code
    }
  });
});

const dbURL = 'mongodb+srv://admin:awO4Bqkqna@cluster0.tiv56.mongodb.net/movie-api?retryWrites=true&w=majority'
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((results) => console.log('baglanti kuruldu'))
  .catch((err) => console.log('baglanti hatasi'))

//  const { MongoClient } = require('mongodb');
//  const uri = "mongodb+srv://admin:awO4Bqkqna@cluster0.tiv56.mongodb.net/movie-api?retryWrites=true&w=majority"; const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//  client.connect(err => {
//    const collection = client.db("test").collection("devices");
//   //perform actions on the collection object
//    client.close();
//  });

module.exports = app;