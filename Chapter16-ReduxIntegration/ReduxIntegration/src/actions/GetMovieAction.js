import * as types from '../constants/ActionTypes';
import {queryMovies} from '../api/Service';
import {Toast} from 'antd-mobile-rn';

export function getMovies() {
  return dispatch => {
    dispatch(beginLoading());
    Toast.loading('加载中...', 0, null, true);
    fetch(queryMovies('北京', 0, 50)).then((response) => response.json()).then((json) => {
      Toast.hide();
      let movies = [];
      for (let i in json.subjects) {
        let movieItem = json.subjects[i];
        let directors = "";
        for (let index in movieItem.directors) {
          let director = movieItem.directors[index];
          if (directors === "") {
            directors = directors + director.name
          } else {
            directors = directors + " " + director.name
          }
        }
        movieItem["directorNames"] = directors;
      
        let actors = "";
        for (let index in movieItem.casts) {
          let actor = movieItem.casts[index];
          if (actors === "") {
            actors = actors + actor.name
          } else {
            actors = actors + " " + actor.name
          }
        }
        movieItem["actorNames"] = actors;
        movies.push(movieItem)
      }
      dispatch(loadMovieSuccess(movies));
    }).catch((e) => {
      Toast.hide();
      let errorMsg = "加载失败";
      dispatch(loadMovieFail(errorMsg));
    })
  }
}

function beginLoading() {
  return {
    type: types.GET_MOVIE_LOADING,
  }
}

function loadMovieSuccess(movies) {
  return {
    type: types.GET_MOVIE_SUCCESS,
    movies: movies
  }
}

function loadMovieFail(errorMessage) {
  return {
    type: types.GET_MOVIE_FAIL,
    errorMessage: errorMessage
  }
}