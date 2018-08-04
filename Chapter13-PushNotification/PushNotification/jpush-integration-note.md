## 安装
```
npm install jpush-react-native --save
npm install jcore-react-native --save
```

或者
```
yarn add jpush-react-native
yarn add jcore-react-native
```

## 配置

### 自动配置

```react-native link jpush-react-native```

执行上述命令后，会要求输入极光推送的appKey，这个是开发者在极光推送官网创建的app得到的appKey。
![image](https://github.com/mrarronz/react-native-blog-examples/raw/master/Chapter13-PushNotification/PushNotification/screenshots/input_app_key.png)

输入之后完成jpush的link操作。接着执行：

```react-native link jcore-react-native```

### Android

link完毕后，android端会在AndroidManifest.xml文件中自动增加 ```<meta-data>``` 部分
![image](https://github.com/mrarronz/react-native-blog-examples/raw/master/Chapter13-PushNotification/PushNotification/screenshots/AndroidManifest.png)

同时/android/app/build.gradle中会自动增加manifestPlaceholders配置：
![image](https://github.com/mrarronz/react-native-blog-examples/raw/master/Chapter13-PushNotification/PushNotification/screenshots/android_app_build.png)

接下来，需要加入JPushPackage：

在`MainApplication.java`中修改代码，增加JPushPackage的初始化方法
```
import cn.jpush.reactnativejpush.JPushPackage;

public class MainApplication extends Application implements ReactApplication {

  // 设置为 true 将不会弹出 toast
  private boolean SHUTDOWN_TOAST = true;

  // 设置为 true 将不会打印 log
  private boolean SHUTDOWN_LOG = true;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new VectorIconsPackage(),
          new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG)
      );
    }

    ......
    
  };
  
  ......
  
}

```
在`MainActivity.java`中加入JPushInterface的初始化等方法
```
import cn.jpush.android.api.JPushInterface;

public class MainActivity extends ReactActivity {

    ......

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        JPushInterface.init(this);
    }

    @Override
    protected void onPause() {
        super.onPause();
        JPushInterface.onPause(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        JPushInterface.onResume(this);
    }
}

```
### 注意
android/build.gradle中gradle版本号需要改为3.1.0，RN创建项目时默认是2.2.3的版本，对于jpush来说这个版本太低了，编译时会出错
```
dependencies {
        classpath 'com.android.tools.build:gradle:3.1.0'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
```
同时在/android/gradle/wrapper/gradle-wrapper.properties中将distributionUrl改为：
```
distributionUrl=https\://services.gradle.org/distributions/gradle-4.4-all.zip
```
至此，android端配置完毕

## iOS
### Step 1
iOS端在执行link命令后，build phases的link binary with libraries下面会多出静态库libRCTJPushModule.a和libRCTJCoreModule.a。
同时我们还需要手动添加以下系统库：
![image](https://github.com/mrarronz/react-native-blog-examples/raw/master/Chapter13-PushNotification/PushNotification/screenshots/ios_support_library.png)
注意UserNotifications.framework是Optional的，因为这个库是iOS10推出的SDK，如果我们的项目是基于iOS 8以上部署的，设置为Required会导致app运行在iOS 10以下系统的手机上一启动就闪退。

### Step 2
iOS的推送功能需要在TARGET ——> Capabilities中打开Push Notifications选项，工程目录下会生成Entitlement文件，这个是iOS推送必要的配置文件
![image](https://github.com/mrarronz/react-native-blog-examples/raw/master/Chapter13-PushNotification/PushNotification/screenshots/ios_push_config.png)

![image](https://github.com/mrarronz/react-native-blog-examples/raw/master/Chapter13-PushNotification/PushNotification/screenshots/ios_entitlement.png)

在info.plist文件中加入以下配置
![image](https://github.com/mrarronz/react-native-blog-examples/raw/master/Chapter13-PushNotification/PushNotification/screenshots/ios_info_plist.png)

### Step 3
然后，检查下AppDelegate.m中JPush在执行`react-native link`命令后自动为我们生成的代码，我们要做的只是如下修改：
```
#import <React/RCTLinkingManager.h>

......

- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(NSInteger))completionHandler
{
  NSDictionary * userInfo = notification.request.content.userInfo;
  if ([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    [JPUSHService handleRemoteNotification:userInfo];
    [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
  }

  completionHandler(UNNotificationPresentationOptionAlert|UNNotificationPresentationOptionSound);
}

// 添加以下代理方法

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
### Step 4
最后需要在`application:didFinishLaunchingWithOptions`方法中增加JPush的初始化方法：
```
JPUSHRegisterEntity * entity = [[JPUSHRegisterEntity alloc] init];
  entity.types = JPAuthorizationOptionAlert|JPAuthorizationOptionBadge|JPAuthorizationOptionSound;
  [JPUSHService registerForRemoteNotificationConfig:entity delegate:self];
  [JPUSHService setupWithOption:launchOptions
                         appKey:@"xxxxxxxxxxxxxxxxxxxx" // 替换为开发者自己的appKey，从极光推送官网创建app之后可得到
                        channel:@"App Store"
               apsForProduction:YES
          advertisingIdentifier:nil];
```
把初始化推送的代码放到这里，是为了在app一启动的时候就去做这件事，虽然jpush-react-native中也提供了RN端js代码初始化推送的方法，但是延迟到了RN页面加载出来的时刻，耗时太久了。

以上就是android和iOS端的配置。

## JPush的使用
```
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

```
我把初始化和监听都放到了App.js中，实际项目中不一定要在启动页App.js中，也可以放到首页，方便页面跳转。

这种配置类说明文档实在毫无营养，不过为了以后少踩坑，还是有必要写一写。



