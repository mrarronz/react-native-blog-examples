import React from 'react';
import {View, Text} from 'react-native';

export default class DetailScreen extends React.Component {
  
  static navigationOptions = {
    headerTitle: 'RN详情页'
  };
  
  render() {
    return (
      <View>
        <Text>这是详情页</Text>
      </View>
    )
  }
}