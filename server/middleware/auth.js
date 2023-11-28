const { User } = require("../models/userInfo");

let auth = (req, res, next) => {
  //인증 처리를 하는 곳

  //1. 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.x_auth;

  //2. 토큰을 복호화한다 > 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });
    
    req.token = token;
    req.user = user;
    next();
  });
  //3. 2조건 만족시 Okay

  //4. 2조건 불만족시 NO
};

module.exports = { auth };