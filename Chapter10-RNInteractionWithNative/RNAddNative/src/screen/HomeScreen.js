import React from 'react';
import {View, Text, Button, StatusBar, NativeModules} from 'react-native';

var nativeModule = NativeModules.OpenNativeModule;

export default class HomeScreen extends React.Component {
  
  constructor() {
    super();
    StatusBar.setBarStyle('light-content');
    this.state = {
      isNavBarHidden: false
    }
  }
  
  render() {
    return (
      <View>
        <Text>首页</Text>
        <Button title={'跳转到详情页'} onPress={() => {
          this.props.navigator.push({
            screen:'Detail',
            title: '详情页',
            subtitle: '这是子标题',
            navigatorStyle:{
              tabBarHidden: true
            }
          });
        }}/>
        <Button title={'跳转到原生页面'} onPress={() => {
          this.jumpToNativeView();
        }}/>
        <Button title={this.state.isNavBarHidden ? '显示navBar' : '隐藏navBar'} onPress={() => {
          this.hideNavBar();
        }}/>
      </View>
    )
  }
  
  jumpToNativeView() {
    nativeModule.openNativeVC();
  }
  
  hideNavBar() {
    let isHidden = !this.state.isNavBarHidden;
    this.props.navigator.setStyle({
      navBarHidden: isHidden,
    });
    this.setState({
      isNavBarHidden: isHidden
    });
  }
}