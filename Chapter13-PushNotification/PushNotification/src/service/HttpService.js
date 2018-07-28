import {AsyncStorage} from 'react-native';
import Store from "./Store";

export default class HttpService {

  /// 模拟调用登录接口
  loginAPI(callback) {
    setTimeout(() => {
      AsyncStorage.setItem("isLogin", JSON.stringify(true));
      Store.isLogin = true;
      Store.userInfo = {userId: 1, userName: "小明", avatar:""};
      callback(true);
    }, 2000)
  }
}