import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Color from "../common/Color";
import MovieListScreen from "./MovieListScreen";

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
    MovieList: {screen: MovieListScreen},
  },
  {
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: '#ffffff',
      headerStyle: {backgroundColor: Color.themeColor},
      showIcon: true
    }
  }
);