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
    title: 'Student List',
    navigatorStyle: {
      navBarTextColor:'white',
      navBarBackgroundColor:'#707aa2',
      navBarButtonColor: 'white',
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
    style={{
      width: 44,
      height: 44,
      backgroundColor:'#707aa2',
      alignItems:'center',
      justifyContent:'center'
    }}
    activeOpacity={1.0}
    onPress={() => {DeviceEventEmitter.emit('AddButtonPressed')}}
  >
    <Icon size={24} name={'plus'} color={'white'}/>
  </TouchableOpacity>
);
Navigation.registerComponent('CustomAddButton', () => CustomAddButton);
