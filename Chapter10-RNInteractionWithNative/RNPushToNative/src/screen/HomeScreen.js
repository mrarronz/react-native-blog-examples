import React from 'react';
import {View, Text, Button, NativeModules} from 'react-native';

var nativeModule = NativeModules.OpenNativeModule;

export default class HomeScreen extends React.Component {
  
  render() {
    return (
      <View>
        <Text>首页</Text>
        <Button title={'跳转到RN详情页'} onPress={() => {
          this.props.navigation.navigate('Detail');
        }}/>
        <Button title={'跳转到原生页面'} onPress={() => {
          this.jumpToNativeView();
        }}/>
      </View>
    )
  }
  
  jumpToNativeView() {
    nativeModule.openNativeVC();
  }
}