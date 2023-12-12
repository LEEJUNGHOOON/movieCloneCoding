//**Movie detail information routing module */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube"; //Simple React component acting as a thin layer over the YouTube IFrame Player API
import "../styles/Detail.css";
import Navigation from "../components/Navigation";
import Loading from "../components/Loading";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const { id } = useParams();

  const getMovie = async () => {// fetch the movie detail json data 
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setLoading(false);
    setDetail(json.data.movie);
  };

  useEffect(() => {
    getMovie();
  }, []);

  function Notloading() { // if fetch completed 
    const bgm = detail.background_image_original;
    return (
      <div>
        <Navigation />
        <div
          className="maindiv"
          data-aos="zoom-in"
          style={{
            padding: 100,
            backgroundImage: `url(${bgm})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="information">
            <img src={detail.large_cover_image} alt={detail.title} />
            <div className="middle">
              <div className="title">
                <h2>{detail.title}</h2>
              </div>
              <div className="subinfo">
                <img
                  style={{ width: 30, height: 30, marginTop: 7 }}
                  src="https://cdn.icon-icons.com/icons2/1875/PNG/512/download_120262.png"
                ></img>
                <p>
                  {detail.download_count} times | Rating : {detail.rating} / 10
                </p>
              </div>
            </div>
            <div className="moreinfo">
              <p>{`(${detail.title_long})`}</p>
              <p>{`${detail.year} | ${
                detail.runtime
              } minutes | ${detail.genres.map((g) => g)}`}</p>
            </div>

            <hr />
            <div className="description" style={{ padding_right: 1000 }}>
              <p>{detail.description_intro}</p>
              {detail.yt_trailer_code === "" ? null : (
                <YouTube
                  //videoId : https://www.youtube.com/watch?v={videoId} 
                  videoId={detail.yt_trailer_code}
                  //opts(Optional): Player size or various player parameters are available
                  opts={{
                    width: "560",
                    height: "315",
                    playerVars: {
                      autoplay: 1, //autoplay= O
                      rel: 0, 
                      modestbranding: 1, // Do not display the YouTube logo on the control bar
                    },
                  }}
                  //Event Listener
                  onEnd={(e) => {
                    e.target.stopVideo(0);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div>{loading ? <Loading /> : <Notloading />}</div>;
}

export default Detail;
