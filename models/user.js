var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
  },
  email: { // TODO: Need to add email validation
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 99
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 99
  }
});

userSchema.methods.authenticated = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, res) {
    if (err) {
      console.log(err)
      cb(err)
    } else {
      cb(null, res ? this : false)
    }
  })
}

userSchema.pre('save', function(next) {
  if (this.isNew) {
    var hash = bcrypt.hashSync(this.password, 10)
    this.password = hash;
  }
  next();
})

userSchema.set('toObject', {
  transform: function(doc, ret, options) {  // ret stands for return
    let returnObject = {...ret};
    delete returnObject.password
    return returnObject
  }
})

var User = mongoose.model('User', userSchema);

module.exports = User;
