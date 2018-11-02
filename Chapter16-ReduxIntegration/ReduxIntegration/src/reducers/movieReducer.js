import * as types from '../constants/ActionTypes';

const initState = {
  loading: false,
  errorMessage:'',
  isSuccess:false,
  movieList: []
};

export default function getMovieList(state=initState, action) {
  switch (action.type) {
    case types.GET_MOVIE_LOADING:
      return {
        ...state,
        loading: true,
        isSuccess:false,
        movieList: [],
      };
    case types.GET_MOVIE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess:true,
        movieList: action.movies
      };
    case types.GET_MOVIE_FAIL:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        movieList: [],
        errorMessage:action.errorMessage
      };
    default:
      return state;
  }
}