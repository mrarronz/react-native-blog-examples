## 安装
`yarn add react-native-wechat` 

or

`npm install react-native-wechat --save`

完成后执行`react-native link react-native-wechat`

### iOS配置
link完之后，iOS工程Build Phases ➜ Link Binary With Libraries中添加libRCTWeChat.a文件，并添加以下系统库
```
SystemConfiguration.framework
CoreTelephony.framework
libsqlite3.0
libc++
libz
```
点击TARGET下项目名——>info界面，添加URL type
![image](https://github.com/mrarronz/react-native-blog-examples/raw/master/Chapter14-Wechat_Login_Share_Pay/WechatUsageExample//screenshots/url_schema.png)

iOS 9以上添加微信白名单
![image](https://github.com/mrarronz/react-native-blog-examples/raw/master/Chapter14-Wechat_Login_Share_Pay/WechatUsageExample//screenshots/ios_info_plist.png)

在AppDelegate.m中添加代码：
```objective-c
#import <React/RCTLinkingManager.h>

#pragma mark - Handle URL

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}

// ios 9.0+
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
            options:(NSDictionary<NSString*, id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}
```
### Android配置
android在link后`android/settings.gradle`、`android/app/build.gradle`中就已经配置好了，MainApplication.java中WeChatPackage也已经自动添加初始化代码。

接下来是关键配置步骤：

### Step 1
在/android/app/src包名目录下创建wxapi包，创建WXEntryActivity.java和WXPayEntryActivity.java。

其中WXEntryActivity.java代码如下，主要用来做微信授权登录、分享等操作时回调app
```java
package com.wechatusageexample.wxapi;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import com.theweflex.react.WeChatModule;
import com.wechatusageexample.MainActivity;

public class WXEntryActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (MainActivity.isActivityCreated) {
            WeChatModule.handleIntent(this.getIntent());
        } else {
            // 如果应用未在后台启动，就打开应用
            Intent intent = new Intent(getApplicationContext(), MainActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            startActivity(intent);
        }

        finish();
    }
}

```
WXPayEntryActivity.java代码如下，主要用来做微信支付调起app
```java
package com.wechatusageexample.wxapi;

import android.app.Activity;
import android.os.Bundle;

import com.theweflex.react.WeChatModule;

public class WXPayEntryActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WeChatModule.handleIntent(getIntent());
        finish();
    }
}

```
### Step 2
在AndroidManifest.xml文件中添加activity声明
```xml
<activity
    android:name=".wxapi.WXEntryActivity"
    android:label="@string/app_name"
    android:exported="true"
/>
<activity
    android:name=".wxapi.WXPayEntryActivity"
    android:label="@string/app_name"
    android:exported="true"
/>
```
在proguard-rules.pro中添加混淆忽略代码:
```
-keep class com.tencent.mm.sdk.** {
  *;
}

```
### Step 3
最重要的一点是gradle版本问题，RN创建项目默认gradle是2.2.3。在编译时react-native-wechat报错，将gradle版本改为3.1.0后问题解决

/android/build.gradle中修改如下
```
dependencies {
        classpath 'com.android.tools.build:gradle:3.1.0'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
```
/android/gradle/wrapper/gradle-wrapper.properties中修改distributionUrl：
```
distributionUrl=https\://services.gradle.org/distributions/gradle-4.4-all.zip
```
以上就是整个配置过程

## 使用方法
首先我们要在微信开放平台获取app id，app secret，微信商户平台得到商户id，商户api密钥。我把这四个重要参数标为：
```
const wxAppId = ""; // 微信开放平台注册的app id
const wxAppSecret = ""; // 微信开放平台注册得到的app secret
const wxMerchantId = ""; // 微信商户ID
const wxTransSecret = ""; // 商户api秘钥
```

### 初始化
```
import * as WeChat from 'react-native-wechat';

WeChat.registerApp(wxAppId);
```

### 登录
在使用微信登录前，我们需要判断下微信是否安装，否则在iOS上发布审核时是会被拒的。如果未安装微信，就不显示微信登录按钮
```javascript
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
```
登录方法如下：
```javascript
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
  
  /// 获取openId
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
```

## 分享
分享到好友
```javascript
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
```

## 支付
```javascript
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
```

## 总结
1、失败时错误码为-2的情况表示用户主动取消的情况，这时我们可以给用户明确的提示，其它情况为微信返回的错误消息

2、微信授权登录时获取到的openid和unionid是唯一的，unionid是对应微信用户的唯一标识，看后台需要哪个，根据实际情况决定是否获取unionid

3、支付时预订单最好由后台生成，否则所有参数都需要客户端自己获取，既不合理也不安全。本例中WeChat.pay中所有参数应该都由后台给出，客户端用这些参数调用SDK方法直接调起微信支付。





