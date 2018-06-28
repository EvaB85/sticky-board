var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var bcrypt = require('bcrypt');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  let hashedPass = '';
  let passwordMatch = false;
  User.findOne({email: req.body.email.toLowerCase()}, function(err, user) {
    if (!user) {
      res.json({user: null, token: null});
    } else {
      hashedPass = user.password;
      passwordMatch = bcrypt.compareSync(req.body.password, hashedPass);
      if (passwordMatch) {
        var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24
        });
        res.json({user: user.toObject(), token});
      } else {
        res.json({ error: true, message: 'Email or password is incorrect'});
      }
    }
  })
})

router.post('/signup', (req, res) => {
  User.findOne({ email: req.body.email.toLowerCase() }, function(err, user) {
    if (user) {
      res.redirect('/auth/signup')
    } else {
      User.create({
        name: req.body.name,
        email: req.body.email.toLowerCase(),
        password: req.body.password,
        numberOfStickies: 0
      }, function(err, user) {
        if (err) {
          console.log("GOT AN ERROR CREATING THE USER")
          res.send(err)
        } else {
          console.log("JUST ABOUT TO SIGN THE TOKEN")
          var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24
          });
          res.json({user: user.toObject(), token})
        }
      });
    }
  });
});

router.post('/validate', (req, res) => {
  var token = req.body.token;
  if (!token) {
    res.status(401).json({message: "Must pass the token"})
  } else {
    jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
      if (err) {
        res.status(401).send(err)
      } else {
        User.findById({
          '_id': user._id
        }, function(err, user) {
          if (err) {
            res.status(401).send(err);
          } else {
            res.json({user: user.toObject(), token})
          }
        })
      }
    })
  }
})




















module.exports = router;
