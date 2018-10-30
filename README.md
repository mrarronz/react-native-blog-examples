# react-native-blog-examples
Sample projects for my react native blog

use "npm install" to install dependencies，
recommended IDE: [WebStorm](http://www.jetbrains.com/webstorm/)

## Overview
RN优点是跨平台、JS代码和样式开发UI迅速、HotReload、热修复，缺点在于性能、开发集成时配置略麻烦，带来的问题也略多，但它值得一学。对于功能复杂型应用还是应该以原生为主RN为辅。

虽然RN的热度已经过去了，但是它依然是非常有价值的，比起谷歌的Flutter和阿里的Weex来说，RN更加成熟、社区资源更加丰富，RN在实际开发中有非常广泛的实践，值得学习使用。其实这些跨平台开发框架有很多异曲同工之妙，学会一门，再了解其它的，短时间内是很容易上手的，对原生开发童鞋来说尤其如此。

本仓库是对React Native系列开发知识的经验总结，目的是使用React Native实现原生开发常见的应用场景。Example由基础常用控件ListView，FlatList等开始逐步深入，涵盖控件使用、页面导航跳转、视频播放器、iconfont、RN与原生的交互等内容，持续更新中(工作原因不定期更新)，感兴趣的可以关注下。

### 后续更新计划(暂定)：
1. Redux的集成和使用
2. 原生控件在RN中的封装和使用，自定义Android和iOS扫描二维码
3. 使用Code Push实现RN的热更新
4. React Native性能优化总结

## Demo对应的文章及说明
1. Chapter1 - [React Native——ListView的使用详解](https://juejin.im/post/5a8f7f586fb9a063417b3eea)
2. Chapter2 - [ReactNative——使用FlatList实现豆瓣电影列表](https://juejin.im/post/5a90ca01f265da4e853d70cc)
3. Chapter3 - [React Native——使用SectionList改造电影列表](https://juejin.im/post/5a93a900f265da4e8c452b36)
4. Chapter4 - [React Native——自定义下拉刷新上拉加载的列表](https://juejin.im/post/5a94d26d6fb9a0636263fd16)
5. Chapter5 - [react-navigation使用介绍及UI组件外实现统一跳转](https://juejin.im/post/5a9668a8f265da4e9d226176)
6. Chapter6 - [TextInput组件的使用示例和最基本的表单校验](#)
7. Chapter7 - [ReactNative——react-native-video实现视频全屏播放](https://juejin.im/post/5a9f9fde518825557207e7b0)
8. Chapter8 - [ReactNative干货分享——视频播放器App](https://juejin.im/post/5ad7288cf265da50407bc8ce)
9. Chapter9 - [ReactNative干货分享——自定义iconfont图标的使用](https://juejin.im/post/5ae1685bf265da0b8a675199)
10. Chapter10 - [RN与原生交互（一）——基本页面跳转](https://juejin.im/post/5b20810ff265da6e432e697c)
11. Chapter10/DataTransfer - [RN与原生交互（二）——数据传递](https://juejin.im/post/5b20ceb16fb9a01e4f47cd49)
12. Chapter11 - [RN调用原生端SQLite数据库](https://www.jianshu.com/p/7e6c98f221ff)
13. Chapter12 - [React Native二维码的生成和扫描](https://www.jianshu.com/p/bfad4c158f07)
14. Chapter13 - [极光推送的集成和使用](https://github.com/mrarronz/react-native-blog-examples/blob/master/Chapter13-PushNotification/PushNotification/jpush-integration-note.md)
15. Chapter14 - [使用react-native-wechat实现微信登录、分享和支付](https://github.com/mrarronz/react-native-blog-examples/blob/master/Chapter14-Wechat_Login_Share_Pay/WechatUsageExample/ExampleNote.md)

## 视频播放器功能

- [x] 支持本地和远程视频地址
- [x] 支持播放和暂停
- [x] 支持横竖屏切换
- [x] 横屏显示视频标题
- [x] 静音功能
- [x] 支持视频选集切换
- [x] 横屏清晰度切换
- [x] 横屏展示分享
- [x] 调整音量
- [x] 调整播放速率，支持多倍速播放
- [x] 适配iPhone X

### TODO
- [x] 视频截屏
- [x] 横屏锁定旋转
- [x] Refine code

### 视频播放器效果图
![image](https://github.com/mrarronz/react-native-blog-examples/raw/master/Chapter8-MyVideoApp/MyVideoApp/screenshots/videoPlayDemo.gif)

![image](https://github.com/mrarronz/react-native-blog-examples/raw/master/Chapter8-MyVideoApp/MyVideoApp/screenshots/portrait.gif)

## iconfont
自定义iconfont在React Native中的使用，[看这一篇文章就足够了...](https://juejin.im/post/5ae1685bf265da0b8a675199)

![image](https://github.com/mrarronz/react-native-blog-examples/raw/master/Chapter9-Iconfont/IconfontExample/screenshots/screenshot6.png)

## Animated
项目演示了RN中动画的使用，RN中复杂动画使用Animated来实现。此处列举几个实现的动画效果：

![image](https://github.com/mrarronz/react-native-blog-examples/raw/master/Chapter15-AnimExample/RNAnimationDemo/screenshots/anim1.gif)
![image](https://github.com/mrarronz/react-native-blog-examples/raw/master/Chapter15-AnimExample/RNAnimationDemo/screenshots/anim2.gif)
![image](https://github.com/mrarronz/react-native-blog-examples/raw/master/Chapter15-AnimExample/RNAnimationDemo/screenshots/anim3.gif)
![image](https://github.com/mrarronz/react-native-blog-examples/raw/master/Chapter15-AnimExample/RNAnimationDemo/screenshots/anim4.gif)
