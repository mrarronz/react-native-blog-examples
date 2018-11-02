import {combineReducers} from 'redux';
import loginIn from './loginReducer';
import getMovieList from './movieReducer';

const rootReducer = combineReducers({
  loginIn: loginIn,
  getMovieList: getMovieList
});

export default rootReducer;