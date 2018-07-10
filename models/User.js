const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");




//user schema
const UserSchema = new Schema({
  name: { type: String,  
          required: true,
          trim: true },
  email: { type: String, 
          unique: true,
          required: true },
  password: { type: String, 
            required: true},
  phone: { type: Number, 
            required: true},
  stores: [
    {
      type: Schema.Types.ObjectId,
      ref: "Store"
    }
  ]      
});

//before saving user, encrypt their password
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

//authenticating user
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        console.log(err);
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback("password is incorrect");
        }
      })
    });
}

const User = mongoose.model("User", UserSchema);


module.exports = User;