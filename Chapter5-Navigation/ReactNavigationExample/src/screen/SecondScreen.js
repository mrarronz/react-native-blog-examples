import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Service from "../common/Service";
import BaseComponent from './BaseComponent';

export default class SecondScreen extends BaseComponent {
  
  static navigationOptions = {
    headerTitle: 'Second'
  };
  
  componentDidMount() {
    Service.backendAPIMethod();
  }
  
  render() {
    return (
      <View>
        <Text>这是第二个页面</Text>
      </View>
    )
  }
}