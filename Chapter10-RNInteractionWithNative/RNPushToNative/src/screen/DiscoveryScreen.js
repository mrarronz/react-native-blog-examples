import React from 'react';
import {View, Text, Button} from 'react-native';

export default class DiscoveryScreen extends React.Component {
  
  render() {
    return (
      <View>
        <Text>发现</Text>
        <Button title={'跳转到原生页面'} onPress={() => {
        
        }}/>
      </View>
    )
  }
}