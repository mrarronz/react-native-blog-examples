import React from 'react';
import {StackNavigator} from 'react-navigation';
import HomeScreen from "./HomeScreen";
import ScannerScreen from "./ScannerScreen";

export default class RootScreen extends React.Component {
  
  render() {
    return <RootNavigator/>
  }
}

const rootParams = {
  Home: {screen: HomeScreen},
  Scan: {screen: ScannerScreen}
};

const navigationOptions = {
  headerBackTitle: null,
  headerTintColor: 'black',
  headerStyle: {backgroundColor: 'white'},
  headerTitleStyle: {fontSize: 18, fontWeight: 'bold'},
  showIcon: true,
};

const RootNavigator = StackNavigator(
  rootParams,
  {
    navigationOptions: navigationOptions,
    initialRouteName:'Home',
    headerMode: 'screen'
  }
);