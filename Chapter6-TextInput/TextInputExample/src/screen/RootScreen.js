import React from 'react';
import {StatusBar} from 'react-native';
import {StackNavigator} from 'react-navigation';
import HomeScreen from "./HomeScreen";
import RegisterScreen from "./RegisterScreen";
import InputAccessoryScreen from "./InputAccessoryScreen";

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
    Home: {screen: HomeScreen},
    Register: {screen: RegisterScreen},
    inputAccessory: {screen: InputAccessoryScreen}
  },
  {
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: 'white',
      headerStyle: {backgroundColor: '#707aa2'},
      headerTitleStyle: {fontSize: 18, fontWeight: 'bold'},
      showIcon: true,
    },
    headerMode: 'screen',
    initialRouteName: 'Home'
  }
);