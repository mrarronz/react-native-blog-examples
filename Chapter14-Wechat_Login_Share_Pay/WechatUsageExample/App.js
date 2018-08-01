/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Dimensions} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => this.wechatLogin()}>
          <Text style={styles.buttonTitleBig}>微信登录</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.shareToFriend()}>
          <Text style={styles.buttonTitleBig}>分享到微信好友</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.shareToTimeline()}>
          <Text style={styles.buttonTitleBig}>分享到朋友圈</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.wechatPay()}>
          <Text style={styles.buttonTitleBig}>微信￥0.01支付</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  // 登录
  wechatLogin() {
  
  }
  
  // 分享到好友
  shareToFriend() {
  
  }
  
  // 分享到朋友圈
  shareToTimeline() {
  
  }
  
  // 支付
  wechatPay() {
  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonTitleBig: {
    fontSize: 18,
    fontWeight:'bold',
    color: 'white',
  },
  button: {
    backgroundColor:'#00c06d',
    borderRadius: 6,
    height: 50,
    width: Dimensions.get('window').width - 60,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
