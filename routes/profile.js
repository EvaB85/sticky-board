var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Sticky = require('../models/sticky');
var User = require('../models/user');

var isLoggedIn = require('../middleware/isLoggedIn');

// GETs all stickies for user
router.get('/:id/sticky', function(req, res) {
  Sticky.find({'userId': req.params.id}, function(err, stickies) {
    if (err) {
      console.log(err);
    } else {
      res.json({stickies: stickies})
    }
  });
});

// POSTS a new sticky to a user
router.post('/:id/sticky', function(req, res) {
  let { newSticky, userId } = req.body;
  Sticky.create({
    userId: userId,
    note: newSticky,
    x: 0,
    y: 0
  }, function(err, sticky) {
    if (err) {
      res.send(err);
    } else {
      console.log(sticky);
      res.send(sticky);
    }
  });
});

router.put('/:id/sticky', (req, res) => {
  console.log(req);
});

module.exports = router;
