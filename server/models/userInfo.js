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
    //비밀번호 암호화 bcrypt
    //salt 생성 (saltRounds= 10)
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
  // plainPassword : 123456 / 암호화된 비번 : #!@#1241@$1~!asd
  //plainPassword 암호화 해서 비교한다
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userInfoSchema.methods.generateToken = function (cb) {
  var user = this;
  //jsonwebToken을 이용하여 토큰 생성 user._id는 mongo id
  // user._id + 'secretToken' = token
  //jwt.sign(payload, secretKey)이 기대값
  //user_.id는 문자열이 아니기 때문에 .toHexString으로 24바이트 16진수 문자열로 바꿔줌?
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
    //유저 아이디를 이용해서 유저를 찾은 다음에
    //클라이언트에서 가져온 토큰과 디비에 보관된 토큰이 일치하는지 확인
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
