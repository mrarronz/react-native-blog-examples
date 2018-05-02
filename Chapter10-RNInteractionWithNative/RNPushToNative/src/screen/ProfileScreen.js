import React from 'react';
import {View, Text, Button} from 'react-native';

export default class ProfileScreen extends React.Component {
  
  render() {
    return (
      <View>
        <Text>我的</Text>
        <Button title={'跳转到原生页面'} onPress={() => {
        
        }}/>
      </View>
    )
  }
}