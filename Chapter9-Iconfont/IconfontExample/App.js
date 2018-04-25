/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';
import HomeScreen from "./src/screen/HomeScreen";
import TabItemPage from "./src/screen/TabItemPage";
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingScreen from "./src/screen/SettingScreen";
import IconFontBasicScreen from "./src/screen/IconfontBasic/IconFontBasicScreen";
import IconFontAdvancedScreen from "./src/screen/IconfontAdvanced/IconFontAdvancedScreen";
import OtherScreen from "./src/screen/OtherUsage/OtherScreen";
import TabBarIOSScreen from "./src/screen/OtherUsage/TabBarIOSScreen";
import NavigatorIOSScreen from "./src/screen/OtherUsage/NavigatorIOSScreen";
import ToolbarAndroidScreen from "./src/screen/OtherUsage/ToolbarAndroidScreen";

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
    return <Navigator />
  }
}

const TabComponent = TabNavigator(
  {
    First: {
      screen: TabItemPage,
      navigationOptions: ({navigation}) => ({
        title: 'Featured',
        tabBarIcon: ({focused}) => (
          <Ionicons name={'ios-star-outline'} size={24} color={focused ? '#f57495' : '#888888'}/>
        ),
        headerRight: (
          <TouchableOpacity style={{width: 44, height: 44, alignItems:'center', justifyContent:'center'}}>
            <Ionicons name={'ios-list'} size={44} color={'white'}/>
          </TouchableOpacity>
        )
      }),
    },
    Second: {
      screen: TabItemPage,
      navigationOptions: ({navigation}) => ({
        title: 'Categories',
        tabBarIcon: ({focused}) => (
          <Ionicons name={'ios-albums-outline'} size={24} color={focused ? '#f57495' : '#888888'}/>
        ),
        headerRight: (
          <TouchableOpacity style={{width: 44, height: 44, alignItems:'center', justifyContent:'center'}}>
            <Ionicons name={'ios-happy-outline'} size={32} color={'white'}/>
          </TouchableOpacity>
        )
      }),
    },
    Third: {
      screen: TabItemPage,
      navigationOptions: ({navigation}) => ({
        title: 'Top Charts',
        tabBarIcon: ({focused}) => (
          <Ionicons name={'ios-list-box-outline'} size={24} color={focused ? '#f57495' : '#888888'}/>
        )
      }),
    },
    Fourth: {
      screen: TabItemPage,
      navigationOptions: ({navigation}) => ({
        title: 'Search',
        tabBarIcon: ({focused}) => (
          <Ionicons name={'ios-search-outline'} size={24} color={focused ? '#f57495' : '#888888'}/>
        )
      }),
    },
    Fifth: {
      screen: TabItemPage,
      navigationOptions: ({navigation}) => ({
        title: 'Updates',
        tabBarIcon: ({focused}) => (
          <Ionicons name={'ios-download-outline'} size={24} color={focused ? '#f57495' : '#888888'}/>
        )
      }),
    }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: false,
    lazy: true,
    tabBarOptions: {
      activeTintColor: '#f57495',
      inactiveTintColor: '#888888',
      style: {backgroundColor: 'white'}
    }
  }
);

const Navigator = StackNavigator(
  {
    Home: {screen: HomeScreen},
    Tab: {screen: TabComponent},
    Setting: {screen: SettingScreen},
    iconBasic: {screen: IconFontBasicScreen},
    iconAdvanced: {screen: IconFontAdvancedScreen},
    other: {screen: OtherScreen},
    tabBar: {screen: TabBarIOSScreen},
    navigator: {screen: NavigatorIOSScreen},
    toolbar: {screen: ToolbarAndroidScreen}
  },
  {
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: 'white',
      headerStyle: {backgroundColor: '#f57495'},
      headerTitleStyle: {fontSize: 18, fontWeight: 'bold'},
      showIcon: true,
    },
    initialRouteName: 'Home',
    headerMode: 'screen'
  }
);




