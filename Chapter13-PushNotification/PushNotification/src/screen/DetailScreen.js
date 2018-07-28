import React from 'react';
import {View, Text} from 'react-native';
import {AppStyles} from "../common/AppStyle";

export default class DetailScreen extends React.Component {
  
  render() {
    return (
      <View style={[AppStyles.container, {alignItems: 'center', justifyContent: 'center'}]}>
        <Text>收到推送消息后点击跳转到详情页</Text>
      </View>
    )
  }
}