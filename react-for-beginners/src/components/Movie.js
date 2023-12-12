import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/Movie.css";
import LikeButton from "./LikeButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMovie, deleteMovie, getLikeMovies } from "../utills/userActions";

//movie renderting module
function Movie({ id, coverImg, title, summary, genres }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [like, setLike] = useState(false);

  const get_likemovies = () => {
    //The part that takes your favorite movie from the user's DB and sets the movie's likes
    const body = { userId: sessionStorage.getItem("userId") };// get user id from session
    const data = dispatch(getLikeMovies(body));//api with server
    data.payload.then((result) => {
      if (result.getLikeMoviesSuccess) {
        if (result.movie.includes(id)) {//If the ID of the corresponding movie is in the user like movie list
          setLike(true);
          console.log(result.movie);
          console.log("set like success");
        }
      } else {
        console.log("get like movie failed");
      }
    });
  };

  useEffect(() => {
    if (sessionStorage.getItem("userId")) {//If there's a user who's logged in
      get_likemovies();
    }
  }, []);

  const doit = async () => {//
    let body = {};
    let data;
    if (!like) {//if user click like button
      body = {
        userId: sessionStorage.getItem("userId"),
        movieId: id,
      };
      data = dispatch(addMovie(body)); //api 통신(add movie)
      data.payload.then((result) => {
        if (result.addMovieSuccess) {
          console.log("add success");
        } else {
          console.log("something wrong with add");
        }
      });
    } else if (like) {//if user click dislike button
      body = {
        userId: sessionStorage.getItem("userId"),
        movieId: id,
      };
      data = dispatch(deleteMovie(body));//api 통신(delete movie)
      data.payload.then((result) => {
        if (result.deleteMovieSuccess) {
          console.log("delete success");
        } else {
          console.log("something wrong with delete");
        }
      });
    }
  };

  useEffect(() => {
    console.log(like);
  }, [like]);

  const onLike = () => {// if like button clicked
    if (sessionStorage.getItem("userId") == null) {//If there's no user who's logged in
      navigate("/login");//Direct to login page
    }
    setLike((pre) => !pre);
    doit();
  };

  return (
    <div className="movieInfo" data-aos="zoom-in-up">
      <Card border="secondary" bg="light" style={{ width: "30rem" }}>
        <Card.Img variant="top" src={coverImg} alt={title} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted ">
            <ul>
              {genres.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </Card.Subtitle>
          <Card.Text>
            {summary.length >= 235 ? `${summary.slice(0, 235)}...` : summary}
          </Card.Text>
          <Button variant="primary" href={`/movie/${id}`}>
            Go Detail
          </Button>
          <LikeButton like={like} onClick={onLike} />
        </Card.Body>
      </Card>
    </div>
  );
}

Movie.propTypes = {//type check with TypeScript
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default Movie;
