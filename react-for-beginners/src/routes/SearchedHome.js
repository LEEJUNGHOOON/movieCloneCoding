/***
 * Genre Searched page
 */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/home.css";
import Movie from "../components/Movie.js";
import Navigation from "../components/Navigation.js";
import Loading from "../components/Loading.js";
import Typewriter from "typewriter-effect";
import { Box, Text, Heading } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { getSearchedMovies } from "../utills/userActions";

function SearchedHome() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [curUser, setCurUser] = useState(null);
  const { genre } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setCurUser(sessionStorage.getItem("name"));
  }, []);

  useEffect(() => {
    getSearchedMovieList();
  }, []);

  const getSearchedMovieList = async () => {
    let params = {
      genre: genre,
    };
    const data = dispatch(getSearchedMovies(params));
    console.log(data);
    data.payload.then((result) => {
      if (result.getSearchedMoviesSuccess) {
        setMovies(result.movies);
        setLoading(false);
      } else {
        console.log("something wrong");
      }
    });
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Navigation />
          <div className="mainContent">
            <div>
              {movies.map((movie) => (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  coverImg={movie.coverImg}
                  title={movie.title}
                  summary={movie.summary}
                  genres={movie.genres}
                />
              ))}
            </div>
            {curUser == null ? null : (
              <div className="greeting">
                <Box
                  as={"header"}
                  style={{ height: 600, width: 600, alignItems: "center" ,position:"sticky",top:"35%"}}
                >
                  <Heading
                    lineHeight={1.1}
                    fontWeight={600}
                    fontSize={"75px"}
                    textAlign={"center"}
                  >
                    <Text mb={"2"} color="white">
                      Welcome
                      <Text
                        as={"span"}
                        position={"relative"}
                        color={"white"}
                        ml={2}
                        _after={{
                          content: "''",
                          width: "full",
                          height: "50%",
                          position: "absolute",
                          bottom: 1,
                          left: 0,
                          bg: "red.400",
                          zIndex: -1,
                        }}
                      >
                        {` ${curUser}`}
                      </Text>
                    </Text>
                    <Text
                      fontSize={{ base: "2xl", sm: "4xl", lg: "6xl" }}
                      as={"span"}
                      color={"#99CCFF"}
                    >
                      <Typewriter
                        options={{
                          autoStart: true,
                          delay: 75,
                          loop: true,
                        }}
                        onInit={(typewriter) => {
                          typewriter
                            .pauseFor(120)
                            .typeString(`<span>Searched Genre : <span>`)
                            .pauseFor(600)
                            .deleteAll()
                            .pauseFor(600)
                            .typeString(`<span>${genre}<span>`)
                            .pauseFor(600)
                            .start();
                        }}
                      />
                    </Text>
                  </Heading>
                </Box>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchedHome;
