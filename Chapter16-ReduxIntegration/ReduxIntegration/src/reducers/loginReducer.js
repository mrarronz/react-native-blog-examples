import * as types from '../constants/ActionTypes';

const initialState = {
  loading: false,
  errorMessage:'',
  isSuccess:false,
  user:null,
};

export default function loginIn(state=initialState, action) {
  switch (action.type) {
    case types.login_processing:
      return {
        ...state,
        loading: true,
        errorMessage: "",
        isSuccess: false,
        user: null
      };
    case types.login_success:
      return {
        ...state,
        loading: false,
        errorMessage: "",
        isSuccess: true,
        user: action.user
      };
    case types.login_fail:
      return {
        ...state,
        loading: false,
        errorMessage: action.errorMsg,
        isSuccess: false,
        user: null
      };
    default:
      return state;
  }
}