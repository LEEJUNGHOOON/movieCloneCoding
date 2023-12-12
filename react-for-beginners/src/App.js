import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { particlesOptions } from "./config/ParticleConfig";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./routes/Login";
import SignIn from "./routes/SignIn";
import Mypage from "./routes/Mypage";
import SearchedHome from "./routes/SearchedHome";
import MyMovies from "./routes/MyMovies";


function App() {
  const particlesInit = (engine) => {
    loadFull(engine);
  };
  useEffect(() => {
    AOS.init({
      //AOS: Scroll-controlled library
      duration: 1200,
      easing: "ease",
    });
    AOS.refresh();
  }, []);
  return (
    <>
      <div className="App">
      <Particles init={particlesInit} options={particlesOptions} />
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/:genre" element={<SearchedHome />}></Route>
            <Route path="/movie/:id" element={<Detail />}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signIn" element={<SignIn/>}></Route>
            <Route path ="/mypage" element={<Mypage/>}></Route>
            <Route path ="/mymovies" element={<MyMovies/>}></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
