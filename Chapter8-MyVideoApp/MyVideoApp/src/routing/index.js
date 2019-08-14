import React from 'react';
import { Animated, Easing } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';

import VideoListScreen from '../view/VideoListScreen';
import VideoPlayScreen from '../view/VideoPlayScreen';
import FullScreenPlayer from "../view/FullScreenPlayer";

const BottomTabNavigator = createBottomTabNavigator({
  VideoList: {
    screen: VideoListScreen,
    navigationOptions: {
      tabBarLabel: '列表模式',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon name={'list'} size={24} color={focused ? '#707ee2' : '#888888'} />
      )
    }
  },
  VideoListFull: {
    screen: VideoListScreen,
    navigationOptions: {
      tabBarLabel: '全屏模式',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon name={'maximize'} size={24} color={focused ? '#707ee2' : '#888888'} />
      )
    }
  }
}, {
    initialRouteName: "VideoList",
    lazy: true,
    tabBarOptions: {
      inactiveTintColor: "#8F8F8F",
      activeTintColor: "#ED5601",
      labelStyle: {
        fontSize: 11
      }
    }
  }
);

const MainStack = createStackNavigator({
  Home: {
    screen: BottomTabNavigator,
  },
  VideoPlay: { screen: VideoPlayScreen },
  FullPlayer: { screen: FullScreenPlayer }
},
  {
    initialRouteName: 'Home',
    // headerMode: 'none',
    defaultNavigationOptions: {
      title: 'Video demo',
      gesturesEnabled: true,
    },
  }
)

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
  },
);

const AppContainer = createAppContainer(RootStack);

export default class Routing extends React.Component {
  render() {
    return <AppContainer />;
  }
}
