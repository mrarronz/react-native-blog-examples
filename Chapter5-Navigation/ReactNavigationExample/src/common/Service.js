import {Alert} from 'react-native';
import {NavigationActions} from 'react-navigation';
import BaseComponent from '../screen/BaseComponent';

export default class Service {
  
  static backendAPIMethod() {
    Alert.alert(
      '提示',
      '请求出错，请重新登录',
      [
        {
          text: '确定', onPress: () => {
            // 退出到登录界面
            let resetAction = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({routeName: 'Login'})
              ],
              key: null
            });
            BaseComponent.screen.nav().dispatch(resetAction);
          }
        }
      ],
      { cancelable: false }
    )
  }
}