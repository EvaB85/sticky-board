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
      res.json({stickies: stickies});
    }
  });
});

// POSTS a new sticky to a user
router.post('/:id/sticky', function(req, res) {
  console.log('in POST profile/:id/sticky');
  console.log('heres req.body: ', req.body);
  let { newSticky, userId } = req.body;
  Sticky.create({
    userId: userId,
    note: newSticky,
    x: 0,
    y: 0
  }, function(err, sticky) {
    if (err) {
      console.log('in POST profile/:id/sticky err');
      res.send(err);
    } else {
      res.send(sticky);
    }
  });
});

router.put('/:uId/sticky/:i\sId', (req, res) => {
  console.log('in PUT profile/:uid/sticky/sid');
  console.log('heres req.body: ', req.body);
  let {x, y, stickyId} = req.body;
  Sticky.findById(stickyId, (err, sticky) => {
    console.log('inside PUT profile/uid/sticky/sid inside Sticky.findById');
    console.log('heres sticky: ', sticky);
    sticky.x = x;
    sticky.y = y;
    sticky.save((err, updatedSticky) => {
      res.json({updatedSticky});
    });
  });
});

router.delete('/:uId/sticky/:sId', (req, res) => {
  let stickyId = req.body.stickyId;
  Sticky.findByIdAndRemove(stickyId, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.send({ msg: 'deleted' });
    }
  })
});

module.exports = router;
