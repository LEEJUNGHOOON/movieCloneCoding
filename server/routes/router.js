const router = require("express").Router();
const MovieList = require("../models/movieList");
const UserInfo = require("../models/userInfo");
const { auth } = require("../middleware/auth");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));

router.use(bodyParser.json());

router.get("/getmovies", (req, res) => {
  MovieList.findAll()
    .then((movies) => {
      if (!movies.length)
        return res.status(404).send({ err: "Todo not found" });
      res.send(movies);
    })
    .catch((err) => res.status(500).send(err));
});

//That's all for the movie API

//SignIn API
router.post("/api/users/register", async (req, res) => {
  let userInfo = new UserInfo(req.body);
  const result = await userInfo
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
});

//Login API
router.post("/api/users/login", async (req, res) => {
  //1. Check if there are users corresponding to db
  console.log(req);
  let userInfo = new UserInfo();
  UserInfo.findOne({ id: req.body.id })
    .then((user) => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: "No users correspond to the email.",
        });
      }
      //2. If you meet the 1st condition, check if the password is correct
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch)
          return res.json({
            loginSuccess: false,
            message: "비밀번호가 틀렸습니다.",
          });
        //3. When meets 2 conditions, create token
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          //Save the token. where? cookie OR local storage OR session storage
          //cookie name: value
          res.cookie("x_auth", user.token).status(200).json({
            loginSuccess: true,
            userId: user._id,
            id: user.id,
            token: user.token,
            name: user.name,
          });
        });
      });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

//Authentication credentials (administrator screen, non-member screen)
//auth is middleware
router.get("/api/users/auth", auth, (req, res) => {
  // When you get this far, it means you've passed through middleware
  // which means Auth is True
  res.status(200).json({
    _id: req.user._id,
    // 0>General user ^ Remaining administrators
    isAuth: true,
    id: req.user.id,
    name: req.user.name,
  });
});

//LogOut
router.get("/api/users/logout", async (req, res) => {
  console.log(req.query.userId);
  UserInfo.findOneAndUpdate({ _id: req.query.userId }, { token: "" }).then(
    (user, err) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({ success: true, user });
    }
  );
});

//PWCheck
router.post("/api/users/pwcheck", async (req, res) => {
  //1. Check if there are users corresponding to db
  let userInfo = new UserInfo();
  UserInfo.findOne({ _id: req.body._id })
    .then((user) => {
      if (!user) {
        return res.json({
          success: false,
          message: "아이디에 해당하는 유저가 없습니다.",
        });
      }
      //2. If you meet the 1st condition, check if the password is correct
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({
            success: false,
            message: "비밀번호가 틀렸습니다.",
          });
        }
        return res.json({
          success: true,
          message: "비밀번호 확인이 완료 되었습니다",
        });
      });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

// Update member information
router.post("/api/users/update", async (req, res) => {
  const newName = req.body.newName;
  const newId = req.body.newId;
  console.log(newName + newId);
  UserInfo.findOneAndUpdate(
    { id: req.body.id },
    { name: newName, id: newId }
  ).then((user, err) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true, user });
  });
});

// Add your favorite movie
router.post("/api/users/addmovie", async (req, res) => {
  const userId = req.body.userId;
  const movieId = req.body.movieId;
  UserInfo.updateOne(
    { _id: userId },
    {
      $push: {
        favmovies: movieId,
      },
    }
  ).then((user, err) => {
    if (err) return res.json({ addMovieSuccess: false, err });
    return res.status(200).send({ addMovieSuccess: true });
  });
});

// Delete your favorite movie
router.post("/api/users/deletemovie", async (req, res) => {
  const userId = req.body.userId;
  const movieId = req.body.movieId;
  UserInfo.updateOne(
    { _id: userId },
    {
      $pull: {
        favmovies: movieId,
      },
    }
  ).then((user, err) => {
    if (err) return res.json({ deleteMovieSuccess: false, err });
    return res.status(200).send({ deleteMovieSuccess: true });
  });
});

// a get function that returns movies that the current user likes
router.get("/api/users/getlikemovies", async (req, res) => {
  UserInfo.findOne({ _id: req.query.userId }).then((user, err) => {
    if (err) return res.json({ getLikeMoviesSuccess: false, err });
    return res
      .status(200)
      .send({ getLikeMoviesSuccess: true, movie: user.favmovies });
  });
});

// a get function that returns movies searche genre movies
router.get("/api/users/getsearchedmovies", async (req, res) => {
  MovieList.find({ genres: req.query.genre }).then((movies, err) => {
    if (err) return res.json({ getSearchedMoviesSuccess: false, err });
    return res
      .status(200)
      .send({ getSearchedMoviesSuccess: true, movies: movies });
  });
});
module.exports = router;
