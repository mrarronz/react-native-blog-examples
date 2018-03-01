import React, {Component} from 'react';
import {View, Button} from 'react-native';
import {NavigationActions} from 'react-navigation';
import BaseComponent from './BaseComponent';

export default class LoginScreen extends BaseComponent {
  
  static navigationOptions = {
    headerTitle: 'Login'
  };
  
  render() {
    return (
      <View style={{ flex: 1, alignItems:'center', justifyContent:'center' }}>
        <Button
          title={'点击登录'}
          onPress={() => {
            this.loginAction();
          }}
        />
      </View>
    )
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