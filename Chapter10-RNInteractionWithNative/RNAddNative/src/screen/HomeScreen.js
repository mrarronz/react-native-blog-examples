import React from 'react';
import {View, Text, Button, StatusBar} from 'react-native';

export default class HomeScreen extends React.Component {
  
  constructor() {
    super();
    StatusBar.setBarStyle('light-content');
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
      </View>
    )
  }
}