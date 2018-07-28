import React from 'react';
import {View, StatusBar, AsyncStorage} from 'react-native';
import {TabNavigator, StackNavigator, TabBarBottom} from 'react-navigation';
import LoginScreen from "./LoginScreen";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppColor from '../common/AppColor';
import HomeScreen from "./HomeScreen";
import SecondScreen from "./SecondScreen";
import MineScreen from "./MineScreen";
import LoadingView from "../components/LoadingView";

export default class RootScreen extends React.Component {
  
  constructor() {
    super();
    StatusBar.setBarStyle('light-content');
    this.state = {
      showLoading: true,
      isLogin: false,
    }
  }
  
  componentWillMount() {
    AsyncStorage.getItem('isLogin').then((value) => {
      let isLogin = JSON.parse(value);
      this.setState({
        isLogin: isLogin,
        showLoading: false
      })
    })
  }
  
  render() {
    if (this.state.showLoading) {
      return (
        <LoadingView/>
      )
    } else {
      return (
        this.state.isLogin ? <RootNavigator/> : <LoginNavigator/>
      )
    }
  }
  
  
}

const TabComponent = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '首页',
        tabBarIcon: ({focused}) => (
          <Icon name={'home'} size={24} color={focused ? AppColor.themeColor : AppColor.tabInActiveColor}/>
        )
      })
    },
    Second: {
      screen: SecondScreen,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '热门',
        tabBarIcon: ({focused}) => (
          <Icon name={'fire'} size={24} color={focused ? AppColor.themeColor : AppColor.tabInActiveColor}/>
        )
      })
    },
    Mine: {
      screen: MineScreen,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '我的',
        tabBarIcon: ({focused}) => (
          <Icon name={'account'} size={24} color={focused ? AppColor.themeColor : AppColor.tabInActiveColor}/>
        )
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
      activeTintColor: AppColor.themeColor,
      inactiveTintColor: AppColor.tabInActiveColor,
      style: {backgroundColor: 'white'}
    }
  }
);

const navigationOptions = {
  headerBackTitle: null,
  headerTintColor: 'white',
  headerStyle: {backgroundColor: AppColor.themeColor},
  headerTitleStyle: {fontSize: 18, fontWeight: 'bold'},
  showIcon: true,
};

const rootParams = {
  Login: {screen: LoginScreen},
  Tab: {screen: TabComponent},
};

const RootNavigator = StackNavigator(
  rootParams,
  {
    navigationOptions: navigationOptions,
    initialRouteName:'Tab',
    headerMode: 'screen'
  }
);

const LoginNavigator = StackNavigator(
  rootParams,
  {
    navigationOptions: navigationOptions,
    initialRouteName:'Login',
    headerMode: 'screen'
  }
);