import React from 'react';
import {View, Text} from 'react-native';
import {AppStyles} from "../common/AppStyle";

export default class MineScreen extends React.Component {
  
  static navigationOptions = {
    headerTitle:'我的'
  };
  
  render() {
    return (
      <View style={[AppStyles.container, {alignItems: 'center', justifyContent: 'center'}]}>
        <Text>这是个人中心页面</Text>
      </View>
    )
  }
}