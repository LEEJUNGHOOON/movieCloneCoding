const port = 4000; //Port no
const url =
  "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"; //Movie Info api URL
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const MovieList = require("./models/movieList");

const app = express();

app.use(cors()); //cors
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/movies", require("./routes/router")); //APIs

app.use(express.static(path.join(__dirname, "../react-for-beginners/build")));



/**
 * Connection to Mongo db
 */
const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://wjdgns9799:9799
@cluster0.gtjir4q.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("mongoDB Connected..."))
  .catch((arr) => console.log(arr));

/**
 * Using fetch function, information is 
 * received in the form of json in the application of providing movie information
 */
const getMovies = async (url) => {
  const json = await (await fetch(url)).json();
  saveMovies(json.data.movies);
};

/**
 * a function of saving a movie to mongodb
 */
const saveMovies = async (arr) => {
  arr.map(async (movie) => {
    let movielist = new MovieList();
    movielist.id = movie.id;
    movielist.coverImg = movie.medium_cover_image;
    movielist.title = movie.title;
    movielist.summary = movie.summary;
    movielist.genres = movie.genres;
    await movielist //Take movie information from api and chapter from mongodb
      .save()
      .then(() => {
        console.log("saved succeed!");
      })
      .catch((err) => {
        console.log("data already exist!");
      });
  });
};

//Get movies api
getMovies(url);

app.listen(port, () => {
  console.log(`Express port : ${port}`);
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../react-for-beginners/build/index.html'));
});