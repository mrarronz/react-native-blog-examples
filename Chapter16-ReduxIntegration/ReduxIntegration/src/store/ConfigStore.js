import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from "../reducers";

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default function configStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}