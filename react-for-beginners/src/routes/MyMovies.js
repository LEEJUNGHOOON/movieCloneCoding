/***
 * User like movies page
 */
import { useEffect, useState } from "react";
import "../styles/Detail.css";
import Navigation from "../components/Navigation";
import Loading from "../components/Loading";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import { useDispatch } from "react-redux";
import { getLikeMovies } from "../utills/userActions";
import { Text, Box, Heading } from "@chakra-ui/react";

function MyMovies() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [movieInfo, setMovieInfo] = useState([]);
  const [ids, setIds] = useState([]);

  const get_likemovies = () => {
    //The part that takes your favorite movie from the user's DB and sets the movie's likes
    const body = { userId: sessionStorage.getItem("userId") };
    const data = dispatch(getLikeMovies(body));
    data.payload.then((result) => {
      if (result.getLikeMoviesSuccess) {
        setIds(...ids, result.movie);
      } else {
        console.log("get like movie failed");
      }
    });
  };

  const getMovies = () => {
    console.log("함수 실행!");
    const movieIdsSet = [...new Set(ids)]; //deduplication of id values
    console.log(movieIdsSet);
    for (let id of movieIdsSet) {
      console.log(`영화 id는 ${id}`);
      fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        .then((response) => {
          return response.json();
        })
        .then((movieJson) => {
          setMovieInfo((curarray) => [movieJson.data.movie, ...curarray]);
        });
    }
    setLoading(false);
  };

  useEffect(() => {
    get_likemovies();
  }, []);

  useEffect(() => {
    if (ids.length !== 0) {
      getMovies(); //This is a problem that's currently running twice
    }
  }, [ids]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="myMovies" style={{ textAlign: "center" }}>
          <Navigation />
          <div style={{}}>
            <Box
              style={{
                textAlign: "center",
                margin: "100px",
              }}
            >
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={"75px"}
                textAlign={"center"}
              >
                <Text mb={"2"} color="Gainsboro">
                  My Movies
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
                  ></Text>
                </Text>
              </Heading>
            </Box>
          </div>
          <div style={{ display: "inline-block" }}>
            {movieInfo.map((movie, index) => (
              <ListGroup key={index} horizontal className="my-2">
                <ListGroup.Item>
                  <Image
                    src={movie.medium_cover_image}
                    width={"100px"}
                    height={"150px"}
                  />
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ maxWidth: "900px", minWidth: "900px" }}
                >
                  <Card.Title>{movie.title}</Card.Title>
                  <br />
                  <Card.Text>
                    {movie.description_intro.length >= 100
                      ? `${movie.description_intro.slice(0, 235)}...`
                      : movie.description_intro}
                  </Card.Text>
                  <Button
                    variant="primary"
                    href={`/movie/${movie.id}`}
                    style={{
                      margin: "2%",
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                    }}
                  >
                    Go Detail
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyMovies;
