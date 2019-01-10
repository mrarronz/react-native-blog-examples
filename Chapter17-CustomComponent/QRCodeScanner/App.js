/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import IndexScreen from "./src/IndexScreen";
import ScanScreen from "./src/ScanScreen";

const AppNavigator = createStackNavigator({
    Index: {
      screen: IndexScreen,
      navigationOptions: {
        headerTitle:'扫描二维码'
      }
    },
    Scan: {
      screen: ScanScreen,
      navigationOptions: {
        headerTitle:'扫描二维码'
      }
    }
  }, {
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: 'white',
      headerStyle: {backgroundColor: '#4ca5ff'},
      headerTitleStyle: {fontSize: 18, fontWeight: 'bold'},
      showIcon: true,
    }
  }
);
const App = createAppContainer(AppNavigator);

export default App;
