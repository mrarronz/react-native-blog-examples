import React from 'react';
import {StatusBar} from 'react-native';
import {StackNavigator} from 'react-navigation';
import VideoListScreen from './VideoListScreen';
import VideoPlayScreen from './VideoPlayScreen';
import FullScreenPlayer from "../components/FullScreenPlayer";

export default class RootScreen extends React.Component {
  
  constructor(props) {
    super(props);
    StatusBar.setBarStyle('light-content');
  }
  
  render() {
    return <Navigator/>
  }
}

const Navigator = StackNavigator(
  {
    VideoList: {screen: VideoListScreen},
    VideoPlay: {screen: VideoPlayScreen},
    FullPlayer: {screen: FullScreenPlayer}
  },
  {
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: '#ffffff',
      headerStyle: {backgroundColor: '#707ee2'},
      showIcon: true
    }
  }
);