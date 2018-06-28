var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stickySchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  note: {
    type: String,
    required: true,
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  }
});

var Sticky = mongoose.model('Sticky', stickySchema);

module.exports = Sticky;
