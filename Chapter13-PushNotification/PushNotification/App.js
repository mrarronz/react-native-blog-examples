/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform} from 'react-native';
import RootScreen from "./src/screen/RootScreen";
import JPushModule from 'jpush-react-native';

type Props = {};
export default class App extends Component<Props> {
  
  componentDidMount() {
    if (Platform.OS === 'android') {
      JPushModule.initPush();
      // 设置android端监听
      JPushModule.notifyJSDidLoad(resultCode => {
        if (resultCode === 0) {
          console.log("设置监听成功");
        }
        JPushModule.addGetRegistrationIdListener((registrationId) => {
          console.log("设备注册成功，registrationId: " + registrationId);
        });
      });
    }
    JPushModule.addReceiveNotificationListener((map) => {
      console.log("收到推送消息");
      console.log(map);
      // TODO: 处理通知消息
    });
    JPushModule.addReceiveOpenNotificationListener((map) => {
      console.log("监听到点击通知的事件");
      console.log(map);
      // TODO: 跳转界面
    
    });
  }
  
  componentWillUnmount() {
    console.log("Will clear all notifications");
    JPushModule.clearAllNotifications();
  }
  
  render() {
    return (
      <RootScreen/>
    );
  }
}
