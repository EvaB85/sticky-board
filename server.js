require('dotenv').config();
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//FOR MONGOOSE
var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/sticky_board', { useMongoClient: true }); // for local dev
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true});  // for heroku deployment

var index = require('./routes/index');
var auth = require('./routes/auth');
var profile = require('./routes/profile');

//USING NPM PACKAGES
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public'))); //commented out for heroku
app.use(express.static(path.resolve(__dirname, 'client', 'build'))); //for heroku deployment

app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.currentUser = req.user;
  next();
});

////PACKAGE.JSON ITEM: "heroku-postbuild": "cd client && npm install --only=dev && npm install && npm run build"
////PACKAGE.JSON ITEM: PORT=3001 - for non-heroku build

app.use('/', index);
app.use('/auth', auth);
app.use('/profile', profile);

// for local
//     "start": "nodemon server.js"

// add this under client package.json scripts for local running
//   "proxy": "http://localhost:3001"

// for heroku deployment
app.get('*', function(req, res, next) {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

module.exports = app;
