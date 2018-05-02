import React from 'react';
import {View, Text} from 'react-native';

export default class TestScreen extends React.Component {
  
  render() {
    return (
      <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
        <Text>测试原生界面到RN的跳转</Text>
      </View>
    )
  }
}