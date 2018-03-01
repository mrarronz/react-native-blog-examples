import React, {Component} from 'react';
import {StackNavigator, TabNavigator, TabBarBottom, CardStack} from 'react-navigation';
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import DetailPage from "./DetailPage";

export default class MainScreen extends Component {
  render() {
    return (
      <MainNavigator/>
    )
  }
}

const TabBar = TabNavigator(
  {
    Page1: {
      screen: Page1,
      navigationOptions:({navigation}) => ({
        tabBarLabel: '发现课程',
        headerTitle: '发现课程',
        tabBarVisible:false,
      }),
    },
    Page2: {
      screen: Page2,
      navigationOptions:({navigation}) => ({
        tabBarLabel: '选课大厅',
        headerTitle: '选课大厅',
        tabBarVisible: false,
      })
    },
    Page3: {
      screen: Page3,
      navigationOptions:({navigation}) => ({
        tabBarLabel: '我的学堂',
        headerTitle: '我的学堂',
        tabBarVisible: false,
      })
    },
    Page4: {
      screen: Page4,
      navigationOptions:({navigation}) => ({
        tabBarLabel: '本地下载',
        headerTitle: '本地下载',
        tabBarVisible: false,
      })
    },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    tabBarOptions: {
      activeTintColor: "#00c06d",
      inactiveTintColor: '#888888',
      style: {backgroundColor: 'white', height: 50},
      labelStyle: {fontSize: 14, fontWeight:'bold'},
      // tabStyle: {opacity: 0}
    },
  }
);

const MainNavigator = StackNavigator(
  {
    Tab: {screen: TabBar},
    Detail: {screen: DetailPage},
  },
  {
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: '#333333',
      headerTitleStyle: {fontSize:18, fontWeight:'bold', color:'#333333', alignSelf:'center'},
      headerStyle: {backgroundColor: "#F5F5FA", height: 50},
      showIcon: true,
      gesturesEnabled: false,
    },
    mode: 'card',
    // headerMode: 'screen',
  }
);