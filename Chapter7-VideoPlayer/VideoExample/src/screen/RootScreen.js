import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {StackNavigator} from 'react-navigation';
import VideoPlayScreen from "./VideoPlayScreen";

export default class RootScreen extends Component {
  
  constructor(props) {
    super(props);
    StatusBar.setBarStyle('light-content')
  }
  
  render() {
    return <Navigator/>
  }
}

const Navigator = StackNavigator(
  {
    VideoPlay: {screen: VideoPlayScreen},
  },
  {
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: '#ffffff',
      headerStyle: {backgroundColor: '#00c06d'},
      showIcon: true
    }
  }
);