import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {AppStyles} from "../common/AppStyle";
import {NavigationActions} from 'react-navigation';
import ProgressHUD from "../components/ProgressHUD";
import HttpService from '../service/HttpService';

export default class LoginScreen extends React.Component {
  
  static navigationOptions = {
    headerTitle:'登录'
  };
  
  render() {
    return (
      <View style={styles.container}>
        <Text>
        demo模拟了登录和退出跳转，收到推送后点击通知消息跳转到详情页面。
        </Text>
        <TouchableOpacity style={AppStyles.buttonContainer} onPress={() =>this.loginButtonClicked() }>
          <Text style={AppStyles.buttonTitleBig}>登录</Text>
        </TouchableOpacity>
        <ProgressHUD ref={(ref) => this.progressHUD = ref}/>
      </View>
    )
  }
  
  loginButtonClicked() {
    this.progressHUD.show('登录中...');
    HttpService.loginAPI((result) => {
      this.progressHUD.hide();
      this.loginAction();
    })
  }
  
  loginAction() {
    let resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'Tab'})
      ],
      key: null
    });
    this.props.navigation.dispatch(resetAction);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    padding: 10
  },
  
});