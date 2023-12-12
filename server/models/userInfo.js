const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userInfoSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 5,
      required: true,
    },
    name: String,
    token: {
      type: String,
    },
    favmovies: {
      type : Array,
      _id: false,
      unique: true,
    },
  },
  { collection: "userList" }
);

userInfoSchema.pre("save", function (next) {
  var user = this;
  if (user.isModified("password")) {
    //Password encryption bcrypt
    //salt generate (saltRounds= 10)
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      //this.password = myPlaintextPassword
      bcrypt.hash(user.password, salt, function (err, hash) {
        // Store hash in your password DB.
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userInfoSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword : 123456 / Encrypted Password : #!@#1241@$1~!asd
  //plainPassword Encrypt and compare
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userInfoSchema.methods.generateToken = function (cb) {
  var user = this;
  //Create a token using jsonwebToken user._id is mongoid
  // user._id + 'secretToken' = token
  //jwt.sign (payload, secretKey) expected value
  //Because user_.id is not a string, do you replace it with a .toHexString to a 24-byte hex string
  var token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  user
    .save()
    .then(() => {
      cb(null, user);
    })
    .catch((err) => {
      return cb(err);
    });
};

userInfoSchema.statics.findByToken = function (token, cb) {
  var user = this;
  //token decode
  jwt.verify(token, "secretToken", function (err, decoded) {
    //After finding the user using the user ID
    //Verify that the token imported from the client matches the token stored in the DB
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

userInfoSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find({});
};

module.exports = mongoose.model("User", userInfoSchema);
