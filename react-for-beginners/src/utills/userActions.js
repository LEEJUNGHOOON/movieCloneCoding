import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  PWCHECK_USER,
  UPDATE_USER,
  ADD_MOVIE,
  DELETE_MOVIE,
  GET_LIKEMOVIES,
  GET_SEARCHEDMOVIES,
} from "./types";

//검색한 장르 영화목록 가져오기
export function getSearchedMovies(dataTosubmit) {
  const request = axios
    .get(
      "http://localhost:4000/movies/api/users/getsearchedmovies",
      { params: dataTosubmit },
      { withCredentials: true }
    )
    .then((response) => response.data);
  return {
    type: GET_SEARCHEDMOVIES,
    payload: request,
  };
}
//로그인
export function loginUser(dataTosubmit) {
  const request = axios
    .post("http://localhost:4000/movies/api/users/login", dataTosubmit)
    .then((response) => response.data);
  return {
    //
    type: LOGIN_USER,
    payload: request,
  };
}

//회원가입
export function registerUser(dataTosubmit) {
  const request = axios
    .post("http://localhost:4000/movies/api/users/register", dataTosubmit)
    .then((response) => response.data);
  return {
    type: REGISTER_USER,
    payload: request,
  };
}
//로그아웃
export function logoutUser(dataTosubmit) {
  const request = axios
    .get(
      "http://localhost:4000/movies/api/users/logout",
      { params: dataTosubmit },
      { withCredentials: true }
    )
    .then((response) => response.data);
  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

//인증처리
export function auth() {
  const request = axios
    .get("/api/users/auth")
    .then((response) => response.data);
  return {
    type: AUTH_USER,
    payload: request,
  };
}

//비밀번호 확인
export function pwCheckUser(dataTosubmit) {
  const request = axios
    .post("http://localhost:4000/movies/api/users/pwcheck", dataTosubmit)
    .then((response) => response.data);
  return {
    //
    type: PWCHECK_USER,
    payload: request,
  };
}

//사용자 정보 업데이트
export function updateUser(dataTosubmit) {
  const request = axios
    .post("http://localhost:4000/movies/api/users/update", dataTosubmit)
    .then((response) => response.data);
  return {
    type: UPDATE_USER,
    payload: request,
  };
}

//사용자 좋아요 영화 추가
export function addMovie(dataTosubmit) {
  const request = axios
    .post("http://localhost:4000/movies/api/users/addmovie", dataTosubmit)
    .then((response) => response.data);
  return {
    type: ADD_MOVIE,
    payload: request,
  };
}

//사용자 좋아요 영화 삭제
export function deleteMovie(dataTosubmit) {
  const request = axios
    .post("http://localhost:4000/movies/api/users/deletemovie", dataTosubmit)
    .then((response) => response.data);
  return {
    type: DELETE_MOVIE,
    payload: request,
  };
}

//사용자 좋아요 영화 목록 요청
export function getLikeMovies(dataTosubmit) {
  const request = axios
    .get(
      "http://localhost:4000/movies/api/users/getlikemovies",
      { params: dataTosubmit },
      { withCredentials: true }
    )
    .then((response) => response.data);
  return {
    type: GET_LIKEMOVIES,
    payload: request,
  };
}
