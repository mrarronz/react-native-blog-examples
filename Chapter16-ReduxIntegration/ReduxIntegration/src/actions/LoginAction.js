import * as types from '../constants/ActionTypes';

let user = {
  "name": "小明",
  "gender" : "male",
  "age": 21
};

export function login() {
  return dispatch => {
    dispatch(isLoginOnGoing());
    
    fetch('https://www.baidu.com').then((res) => {
      dispatch(loginSuccess(user));
    }).catch((e) => {
      dispatch(loginFail("用户名或密码错误"));
    })
  }
}

function isLoginOnGoing() {
  return {
    type: types.login_processing,
    loading: true,
  }
}

function loginSuccess(user) {
  return {
    type: types.login_success,
    user: user,
    loading: false
  }
}

function loginFail(errorMsg) {
  return {
    type: types.login_fail,
    errorMsg: errorMsg,
    loading: false
  }
}