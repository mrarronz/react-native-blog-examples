/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text, Alert, View, Dimensions} from 'react-native';
import * as WeChat from 'react-native-wechat';
import ProgressHUD from "./ProgressHUD";
import MD5 from './MD5';

const wxAppId = ""; // 微信开放平台注册的app id
const wxAppSecret = ""; // 微信开放平台注册得到的app secret
const wxMerchantId = ""; // 微信商户ID
const wxTransSecret = ""; // 商户api秘钥

type Props = {};
export default class App extends Component<Props> {
  
  constructor(props) {
    super(props);
    this.state = {
      isWXInstalled: true // 默认用户已安装微信app
    };
    // 使用微信SDK之前需要注册，这里由于wxAppId是空字符串，所以demo中点击button没有反应，需要换成用户自己的appId
    WeChat.registerApp(wxAppId);
  }
  
  componentWillMount() {
    WeChat.isWXAppInstalled().then((isInstalled) => {
      this.setState({
        isWXInstalled: isInstalled
      });
      if (isInstalled) {
        console.log('微信已经安装');
      } else {
        console.log('微信未安装');
      }
    });
  }
  
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
        <ProgressHUD ref={(ref) => this.progressHUD = ref}/>
      </View>
    );
  }
  
  // 登录
  wechatLogin() {
    if (!this.state.isWXInstalled) {
      this.showAlert('微信未安装');
      return;
    }
    WeChat.sendAuthRequest('snsapi_userinfo', 'wechat_sdk_demo').then((response) => {
      this.getOpenId(response.code);
    }).catch((error) => {
      let errorCode = Number(error.code);
      if (errorCode === -2) {
        this.showAlert('已取消授权登录'); // errorCode = -2 表示用户主动取消的情况，下同
      } else {
        this.showAlert('微信授权登录失败');
      }
    })
  }
  
  
  getOpenId(code) {
    this.progressHUD.show();
    let requestUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + wxAppId + "&secret=" + wxAppSecret + "&code=" + code + "&grant_type=authorization_code";
    fetch(requestUrl).then((response) => response.json()).then((json) => {
      console.log('获取微信openid成功');
      console.log(json);
      this.getUnionId(json.access_token, json.openid);
    }).catch((error) => {
      this.progressHUD.hide();
      this.showAlert('微信授权登录失败');
    })
  }
  
  getUnionId(accessToken, openId) {
    let requestUrl = "https://api.weixin.qq.com/sns/userinfo?access_token=" + accessToken + "&openid=" + openId;
    fetch(requestUrl).then((response) => response.json()).then((json) => {
      console.log('获取微信unionid成功');
      console.log(json);
      // TODO: 这里openId和unionId都已经成功获取了，调用用户自己的接口传递openId或unionId登录或注册
      // put your login method here...
    }).catch((error) => {
      this.progressHUD.hide();
      this.showAlert('微信授权登录失败');
    })
  }
  
  // 分享到好友
  shareToFriend() {
    if (!this.state.isWXInstalled) {
      this.showAlert('微信未安装');
      return;
    }
    WeChat.shareToSession({
      type:'news',
      webpageUrl:'https://www.baidu.com',
      title:'Test sharing',
      description:'This is a test'
    }).then((response) => {
      console.log(response);
      this.showAlert('分享成功');
    }).catch((error) => {
      let errorCode = Number(error.code);
      if (errorCode === -2) {
        this.showAlert('分享已取消');
      } else {
        this.showAlert('分享失败');
      }
    })
  }
  
  // 分享到朋友圈
  shareToTimeline() {
    if (!this.state.isWXInstalled) {
      this.showAlert('微信未安装');
      return;
    }
    WeChat.shareToTimeline({
      type:'news',
      webpageUrl:'https://www.baidu.com',
      title:'Test sharing',
      description:'This is a test'
    }).then((response) => {
      console.log(response);
      this.showAlert('分享成功');
      
    }).catch((error) => {
      let errorCode = Number(error.code);
      if (errorCode === -2) {
        this.showAlert('分享已取消');
      } else {
        this.showAlert('分享失败');
      }
    })
  }
  
  // 支付
  wechatPay() {
    if (!this.state.isWXInstalled) {
      this.showAlert('微信未安装');
      return;
    }
    /**************添加支付处理过程****************/
    
    // 第一步，获取预订单prepayId，生成预订单最好让做后台接口的童鞋来完成，app端调用接口获取预订单
    let prepayId = ""; // 这里预订单是从接口获取的，这里简写仅做演示
    let tempTime = Date.parse(new Date());
    let timestamp = (tempTime/1000).toString();
    let nonce_str = MD5.hexMD5(timestamp);
  
    // 第二步，拼装参数
    let params = {
      "appid": wxAppId,
      "noncestr": nonce_str,
      "package": "Sign=WXPay",
      "partnerid": wxMerchantId,
      "timestamp": timestamp,
      "prepayid": prepayId,
    };
    let paramsList = [];
    let sortedKeys = Object.keys(params).sort();
    for (let i = 0; i < sortedKeys.length; i++) {
      let keyValueCombo = sortedKeys[i] + "=" + params[sortedKeys[i]];
      paramsList.push(keyValueCombo);
    }
    let paramsString = paramsList.join('&');
    let finalString = paramsString + "&key=" + wxTransSecret;
    let encryptedStr = MD5.hexMD5(finalString).toUpperCase(); // MD5加密后转为大写
  
    // 第三步，调起微信客户端支付
    WeChat.pay({
      appId: wxAppId,
      partnerId: wxMerchantId,
      prepayId: prepayId,
      nonceStr: nonce_str,
      timeStamp: timestamp,
      package: 'Sign=WXPay',
      sign: encryptedStr
    }).then((response) => {
      console.log('支付成功');
      console.log(response);
      let errorCode = Number(response.errCode);
      if (errorCode === 0) {
        this.showAlert('支付成功');
        // TODO: 这里处理支付成功后的业务逻辑，比如支付成功跳转页面、清空购物车。。。。
        // .....
      } else {
        this.showAlert(response.errStr);
      }
    }).catch((error) => {
      let errorCode = Number(error.code);
      if (errorCode === -2) {
        this.showAlert('已取消支付');
      } else {
        this.showAlert('支付失败');
      }
    });
  }
  
  showAlert(msg) {
    Alert.alert('提示', msg, [{text: '确定', onPress:() => {}}], {cancelable: false});
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
