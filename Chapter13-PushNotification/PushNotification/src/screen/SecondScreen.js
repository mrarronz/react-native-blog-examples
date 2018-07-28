import React from 'react';
import {View, Text} from 'react-native';
import {AppStyles} from "../common/AppStyle";

export default class SecondScreen extends React.Component {
  
  static navigationOptions = {
    headerTitle:'热门'
  };
  
  render() {
    return (
      <View style={[AppStyles.container, {alignItems: 'center', justifyContent: 'center'}]}>
        <Text>这是热门页面</Text>
      </View>
    )
  }
}