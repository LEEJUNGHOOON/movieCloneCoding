/***
 * main page
 */
import { useState, useEffect } from "react";
import "../styles/home.css";
import Movie from "../components/Movie.js";
import Navigation from "../components/Navigation.js";
import Loading from "../components/Loading.js";
import axios from "axios";
import Typewriter from "typewriter-effect";
import { Box, Text, Heading } from "@chakra-ui/react";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [curUser, setCurUser] = useState(null);

  useEffect(() => {
    // get loggined user
    setCurUser(sessionStorage.getItem("name"));
  }, []);

  const getMovies = async () => {
    // generally get all movies from server
    await axios
      .get("http://localhost:4000/movies/getmovies") // GET
      .then((res) => {
        setMovies(res.data);
      });
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

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
                  style={{
                    height: 600,
                    width: 600,
                    alignItems: "center",
                    position: "sticky",
                    top: "35%",
                  }}
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
                            .typeString("<span>We Provide <span>")
                            .pauseFor(600)
                            .deleteAll()
                            .pauseFor(600)
                            .typeString("<span>Selected Movies<span>")
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

export default Home;
