import React, {Component} from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';

export default class LoadingView extends Component {
  render(){
    return (
      <View style={loadingStyle.container}>
        <ActivityIndicator size='large' color={'#666666'}/>
        <Text style={loadingStyle.tipLabel}>努力加载中</Text>
      </View>
    )
  }
}

const loadingStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  tipLabel: {
    fontSize: 16,
    color: '#666666',
    marginLeft: 10,
  }
});