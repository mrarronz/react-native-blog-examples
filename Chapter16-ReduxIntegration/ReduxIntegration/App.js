/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import HomeScreen from "./src/screen/HomeScreen";
import ProfileScreen from "./src/screen/ProfileScreen";
import LoginScreen from "./src/screen/LoginScreen";
import {Provider} from 'react-redux';
import configStore from "./src/store/ConfigStore";
import DetailScreen from "./src/screen/DetailScreen";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const store = configStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
    )
  }
}

const Main = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel:'主页',
      tabBarIcon: ({focused}) => (
        <Icon name={'home'} size={24} color={focused ? '#4ca5ff' : '#888'}/>
      )
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel:'我的',
      tabBarIcon: ({focused}) => (
        <Icon name={'account'} size={24} color={focused ? '#4ca5ff' : '#888'}/>
      )
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: '#4ca5ff',
    inactiveTintColor: '#888888'
  }
});

Main.navigationOptions = ({navigation}) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  let title = "";
  switch (routeName) {
    case 'Home':
      title = '主页';
      break;
    case 'Profile':
      title = '我的';
      break;
  }
  return {
    headerTitle:title
  }
};

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Main: {
    screen: Main
  },
  Detail: {
    screen: DetailScreen
  }
}, {
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: 'white',
      headerStyle: {backgroundColor: '#4ca5ff'},
      headerTitleStyle: {fontSize: 18, fontWeight: 'bold'},
      showIcon: true,
    },
    headerMode: 'screen'
  }
);

