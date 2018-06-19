import React from 'react';
import {View, DeviceEventEmitter} from 'react-native';

export default class HomeScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      newsList: []
    };
  }
  
  componentWillMount() {
    this.listener = DeviceEventEmitter.addListener('AddButtonPressed', () => {
      // TODO: 点击增加新的条目
    });
  }
  
  componentWillUnmount() {
    this.listener && this.listener.remove();
  }
  
  render() {
    return <View/>
  }
}