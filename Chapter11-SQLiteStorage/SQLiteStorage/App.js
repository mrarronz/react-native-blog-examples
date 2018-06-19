/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React from 'react';
import {TouchableOpacity, DeviceEventEmitter} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {registerScreens} from "./src/screen/IndexPage";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'Home',
    title: 'Home',
    navigatorStyle: {
      navBarTextColor:'white',
      navBarBackgroundColor:'#2E95DD'
    },
    navigatorButtons: {
      rightButtons: [
        {
          id:'addButton',
          component:'CustomAddButton',
        }
      ]
    }
  }
});

const CustomAddButton = () => (
  <TouchableOpacity
    style={{width: 44, height: 44, alignItems:'center', justifyContent:'center'}}
    onPress={() => {DeviceEventEmitter.emit('AddButtonPressed')}}
  >
    <Icon size={24} name={'plus'} color={'white'}/>
  </TouchableOpacity>
);
Navigation.registerComponent('CustomAddButton', () => CustomAddButton);
