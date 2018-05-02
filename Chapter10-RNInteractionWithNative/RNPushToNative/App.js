/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StatusBar} from 'react-native';
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from "./src/screen/HomeScreen";
import DiscoveryScreen from "./src/screen/DiscoveryScreen";
import ProfileScreen from "./src/screen/ProfileScreen";
import DetailScreen from "./src/screen/DetailScreen";

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <RootScreen/>
    );
  }
}

class RootScreen extends React.Component {
  
  constructor() {
    super();
    StatusBar.setBarStyle('light-content');
  }
  
  render(){
    return <Navigator/>
  }
}

const TabBarComponent = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({
        title: '首页',
        tabBarIcon: ({focused}) => (
          <Icon name={focused ? 'ios-home' : 'ios-home-outline'} size={24} color={focused ? '#f54665' : '#888888'}/>
        )
      })
    },
    discovery: {
      screen: DiscoveryScreen,
      navigationOptions: ({
        title: '发现',
        tabBarIcon: ({focused}) => (
          <Icon name={focused ? 'ios-paper-plane' : 'ios-paper-plane-outline'} size={24} color={focused ? '#f54665' : '#888888'}/>
        )
      })
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: ({
        title: '我的',
        tabBarIcon: ({focused}) => (
          <Icon name={focused ? 'ios-person' : 'ios-person-outline'} size={24} color={focused ? '#f54665' : '#888888'}/>
        )
      })
    }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: false,
    lazy: true,
    tabBarOptions: {
      activeTintColor: '#f54665',
      inactiveTintColor: '#888888',
      style: {backgroundColor: 'white'}
    }
  }
);

const Navigator = StackNavigator(
  {
    Tab: {screen: TabBarComponent},
    Detail: {screen: DetailScreen}
  },
  {
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: 'white',
      headerStyle: {backgroundColor: '#f54665'},
      headerTitleStyle: {fontSize: 18, fontWeight: 'bold'},
      showIcon: true,
    },
    headerMode: 'screen'
  }
);





