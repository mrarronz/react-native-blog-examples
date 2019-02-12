## 在RN中集成原生端二维码扫描功能

之前在RN中实现扫描二维码功能都是借助于第三方库`react-native-camera`。配置繁琐容易出错，因此打算直接用原生代码实现扫码功能。本仓库中演示项目Chapter17实现了此功能，并且相对于RN组件形式有以下优点：

* UI可配置
* 扫码区域限制在矩形框内，iOS默认限制框内识别，android可配置全屏识别或框内识别。


下面主要说明android和iOS端如何实现，以及集成到RN的全过程。

### iOS实现

iOS端实现扫码用的是我之前创建的一个简易的库[`QRCodeScanner`](https://github.com/mrarronz/QRCodeScanner)。

用cocoapods集成就行了，多余的步骤就不说了。

在iOS project中创建一个UIViewController继承QRScannerViewController，重写两个方法就可以完成扫码功能。`customStyle`方法用来设置扫码框UI样式，`handleScanResult`方法处理获取到的二维码数据。

参考demo，实现起来非常简单！

### Android实现

Android端实现扫码一般都是用Zxing这个库，这方面资料太多了，具体集成步骤不赘述。集成这个库一般就两个过程：集成过程和UI定制过程。这里为了简便，我使用了第三方作者基于zxing封装好的库[`zxing`](https://github.com/yuzhiqiang1993/zxing)，其UI配置风格恰好与我所写的iOS库相似，因此扫码界面UI可以达到比较统一的效果。

另外android端动态获取扫码相应的权限是基于[`AndPermission `](https://github.com/yanzhenjie/AndPermission)这个库实现的。

参考相关库实现android扫码也很简单。


### issue
本demo项目实现扫码的过程是RN——>原生——>扫码——>RN显示结果。原生端扫码完成后直接dismiss掉当前界面并在RN页面上显示结果。
iOS端使用block完成回调，比较好处理，关键是android端。

android端在`OpenNativeModule`类中使用`startActivityForResult`方法启动扫码界面，要监听返回结果需要使用`onActivityResult`方法，但是`onActivityResult`方法只能在Activity中重写，而扫码结果需要在`scanQRCode`这个函数中以callback形式返回，怎么办呢？

### 解决过程如下：

* 在`MainActivity`中重写`onActivityResult `方法，监听扫码返回结果。

* 在`MainActivity `中构建一个单一数据队列ArrayBlockingQueue，用来存放扫码的结果string

* 在`OpenNativeModule`的`scanQRCode`方法中调用以callback形式返回这个队列中存储的数据。

* `scanQRCode`中跳转传递的context使用当前activity，通过getCurrentActivity来获取。

android代码：

```
Intent intent = new Intent();
intent.setClass(currentActivity, CaptureActivity.class);
intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
// 配置扫码UI
ZxingConfig config = new ZxingConfig();
config.setDecodeBarCode(false); // 不扫描条形码
config.setReactColor(R.color.angleColor); // 四个角的颜色
config.setFrameLineColor(R.color.borderColor); // 扫描框边框颜色
config.setScanLineColor(R.color.angleColor); // 扫描线的颜色
config.setFullScreenScan(false); // 设置是否全屏扫描
config.setShowbottomLayout(false); // 不显示下方功能布局
intent.putExtra(Constant.INTENT_ZXING_CONFIG, config);
currentActivity.startActivityForResult(intent, REQUEST_CODE_SCAN, null);
callback.invoke(MainActivity.mQueue.take());                              
```
这样还有一个重要问题，就是跳转扫码界面后`onActivityResult `方法就立即执行了，这时获取不到扫码结果，因为还没扫。扫描完成之后这个方法不再调用，也拿不到结果。找了半天原因，发现原来是

```
intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
```
导致的。Activity的launchmode设置为new task，会导致系统取消onActivityResult的回调。所以这句应该去掉。

到这里android端的问题就解决了。



## PS：

原本是想以`react-native-library`的形式创建自定义组件然后在RN中使用的，考虑到组件功能复杂性，创建一个单独的代码仓库来封装扫码组件是更好的选择，所以之后我会考虑封装一个RN扫码组件库。

