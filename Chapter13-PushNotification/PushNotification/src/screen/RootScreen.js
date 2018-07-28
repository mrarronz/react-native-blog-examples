import React from 'react';
import {View, StatusBar, AsyncStorage} from 'react-native';
import {TabNavigator, StackNavigator, TabBarBottom} from 'react-navigation';

export default class RootScreen extends React.Component {
  
  constructor() {
    super();
    StatusBar.setBarStyle('light-content');
    this.state = {
      showLoading: true,
      isLogin: false,
    }
  }
  
  componentWillMount() {
    AsyncStorage.getItem('isLogin').then((value) => {
      let isLogin = JSON.parse(value);
      this.setState({
        isLogin: isLogin,
        showLoading: false
      })
    })
  }
  
  render() {
    return <View/>
  }
  
  
}