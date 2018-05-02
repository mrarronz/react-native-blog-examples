import React from 'react';
import {View, Button, Text} from 'react-native';

export default class ProfileScreen extends React.Component {
  
  render() {
    return (
      <View>
        <Text>个人资料</Text>
        <Button title={'跳转到弹窗页'} onPress={() => {
          this.props.navigator.showModal({
            screen:'Modal',
            title: '详情页',
            subtitle: '这是子标题',
          });
        }}/>
      </View>
    )
  }
}