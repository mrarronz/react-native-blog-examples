import React from 'react';
import {StatusBar} from 'react-native';
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';
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

const TabNav = TabNavigator(
  {
    Mode1: {
      screen: VideoListScreen,
    },
    Mode2: {
      screen: VideoListScreen
    }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    tabBarOptions: {
      activeTintColor: '#707ee2',
      inactiveTintColor: '#888888',
      style: {backgroundColor: 'white'}
    }
  }
);

const Navigator = StackNavigator(
  {
    Home: {screen: TabNav},
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