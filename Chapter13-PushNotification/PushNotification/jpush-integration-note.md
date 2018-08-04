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

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}

```
在`MainActivity.java`中加入JPushInterface的初始化等方法
```
import cn.jpush.android.api.JPushInterface;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "PushNotification";
    }

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

