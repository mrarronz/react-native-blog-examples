import {combineReducers} from 'redux';
import loginIn from './loginReducer';

const rootReducer = combineReducers({
  loginIn: loginIn,
});

export default rootReducer;