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

export default function (state = {}, action) {
  switch (action.type) {
    case GET_SEARCHEDMOVIES:
      return { ...state, getSearchedMoviesSuccess: action.payload };
      break;
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
      break;
    case REGISTER_USER:
      return { ...state, register: action.payload };
      break;
    case AUTH_USER:
      return { ...state, userData: action.payload };
      break;
    case LOGOUT_USER:
      return { ...state, logoutSuccess: action.payload };
      break;
    case PWCHECK_USER:
      return { ...state, pwCheck: action.payload };
      break;
    case UPDATE_USER:
      return { ...state, updateSuccess: action.payload };
      break;
    case ADD_MOVIE:
      return { ...state, addMovieSuccess: action.payload };
      break;
    case DELETE_MOVIE:
      return { ...state, deleteMovieSuccess: action.payload };
      break;
    case GET_LIKEMOVIES:
      return { ...state, getLikeMoviesSuccess: action.payload };
      break;
    default:
      return state;
  }
}
