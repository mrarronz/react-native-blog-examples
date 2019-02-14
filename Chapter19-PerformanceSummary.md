# React Native性能优化总结

本篇文章结合了自己的实践经验、同时也参考了其它作者的一些宝贵经验，总结了RN中性能优化相关的一些知识点。如果有新的优化方案或经验，会持续更新。

### 1、首屏优化

* **预加载bundle**

在app启动时就对RN的bundle进行预加载可以减少进入app时白屏的持续时间。

android端影响白屏的主要原因在于下面两句代码：

```
mReactRootView = createRootView();
mReactRootView.startReactApplication(
      getReactNativeHost().getReactInstanceManager(),
      appKey,
      getLaunchOptions());
```
解决办法就是以空间换时间，在app启动时候，就将ReactRootView初始化出来，并缓存起来，在用的时候从缓存获取ReactRootView使用，达到秒开。


* **闪屏页优化**

一般app启动都会显示一个闪屏页(splash screen)，展示一张启动图。可以利用这个业务场景使RN代码在闪屏页下执行，执行完毕后移除闪屏页。

具体做法思路是android和iOS都准备对应的启动图片，iOS使用Launch Image，有不同的屏幕尺寸。在app启动函数中展示这张图片，覆盖整个window，在RN初始页面中的componentDidMount函数中调用原生方法关闭闪屏页，这是最简单的做法。这里推荐一个第三方库[`react-native-splash-screen`](https://github.com/crazycodeboy/react-native-splash-screen)。

### 2、UI更新优化
* **shouldComponentUpdate**

对于组件渲染后无需再次更新的，建议继承PureComponent，避免因修改state导致的重复渲染。

在组件继承自Component的情况下，使用shouldComponentUpdate来控制组件是否需要re-render。如果是静态组件，直接返回false，阻止其重复渲染。

* **动画优化**

1）使用 LayoutAnimation

针对一次性动画，使用LayoutAnimation更好，它利用了原生的核心动画，不会被JS线程和主线程掉帧影响。

2）使用 setNativeProps

setNativeProps方法可以使我们直接修改基于原生视图组件的属性，而不会触发组件的componentWillReceiveProps、shouldComponentUpdate、componentWillUpdate等组件生命周期中的方法，从而引起不必要的重复渲染。

3）useNativeDriver

在 Animated 动画设定中，添加 useNativeDriver 字段，并设为 true，这样就可以直接修改原生视图属性，不通过setState重新渲染结构。

* **数组遍历**

遍历数组时给子组件增加唯一标识key，使DOM在Diff阶段准确知道要操作的子组件，提高Diff效率。

* **长列表优化**

官方文档很明确的提出使用FlatList和SectionList替代ListView来实现长列表，ListView组件已过期并且API不如FlatList和SectionList简单易用。

FlatList只会渲染屏幕上可见的组件，而ScrollView会一次性显示所有列表项。因此在某些适合使用列表的场景下使用FlatList取代ScrollView是更好的做法。

在renderItem时列表项的渲染要使用好shouldComponentUpdate方法，避免不必要的重复渲染，可以大大节省视图开销，界面显示会更加迅速流畅。


* **使用InteractionManager**

使用`InteractionManager.runAfterInteractions(...)`来处理耗时操作。遵循交互优先的原则，我们应该优先显示页面组件和动画，其它耗时操作应该往后延，像网络请求这样的耗时操作就可以放到InteractionManager中执行。

* **组件渲染优化**

1）减少页面组件复杂度

子组件太多会增加渲染时间，同样对代码维护来说也是灾难。

特别是首屏页面，应减少组件复杂度。对于像FlatList这样的组件应该按需加载，例如下拉刷新上拉加载更多的处理。

2）组件颗粒化

通用的组件可以提取出来，作为单独的组件，固定样式和布局。组件中包裹的部分内容组件使用`{children}`来预留位置

静态组件就更简单了，可以提取出来，按需设置样式。

* **Navigator跳转和重复点击**

点击按钮跳转页面时如果连续多次点击，可能页面就会多次重复跳转。

一般解决方案都是在点击按钮时增加一个bool值控制延时点击，代码类似下面这样：

```
buttonClick(){ 
this.setState({waiting: true});
// 跳转页面
this.props.navigation.navigate('newPage');//这里以react-navigation为例
setTimeout(
	()=> { 
		this.setState({waiting: false}) 
	}, 2000);   
}
```
还有一种方案是设置两次点击的间隔时间，如下：

```
var lastNavTime = "";
export const jumpPage=(navigation,page,params)=>{
   //上次点击与本次点击时间差在 1000 毫秒之内，就返回
  if(lastNavTime+1000 >= Date.now()){
    return;
  }
  lastNavTime = Date.now();
  if(navigation){
    navigation.push(page,params);
  }
}
```
来自[https://blog.csdn.net/xukongjing1/article/details/86743044](https://blog.csdn.net/xukongjing1/article/details/86743044)

这两种方式其实都是限制点击事件，使同一个点击事件不被连续触发。

另外还有一种方式是直接修改react-navigation库的源码，延时跳转，类似于上面第一种方式。修改源码这种方式不太可取，一旦依赖库更新，又得重新改源码。


### 3、其它优化

官方文档也给出了很多非常好的性能优化建议，如：

1、在JS线程中同时做很多事情会导致JS线程掉帧

这就要求我们遵循交互优先的原则，先保证UI和动画的优先展示，其它耗时操作后执行。

2、在屏幕上移动视图会导致UI线程掉帧

尽量避免这种情况出现，如果一定要实现类似效果，打开`shouldRasterizeIOS`或者`renderToHardwareTextureAndroid`属性。同时也要注意如果过度使用也会导致内存暴涨，这就要求我们合理使用此类方式，控制好内存，一旦完成相应的视图操作，应该关掉相关属性。

3、以动画形式改变图片尺寸会导致UI线程掉帧

我在前面的动画相关demo中也做过类似事情，直接使用动画改变view或者图片的大小。正确的做法是使用`transform:[{scale}]`的方式，而不是直接修改`width`和`height`属性

这里只列出以上三点，其它情况在上面已经说过了，不再赘述。

关于React Native的性能优化问题，可探讨的地方还很多。虽然RN的性能与原生相比还有差距，但在原本的基础上努力优化还是有不少提升空间的。后续如果有更好的方案，会持续更新。

本文在写作时结合自己实践经验，同时也参考了以下内容，推荐阅读：

[React Native在元气阅读的实践](https://juejin.im/post/5b61479b6fb9a04f9963be77)

[React Native性能优化总结](https://github.com/amandakelake/blog/issues/49)

[Performance](https://facebook.github.io/react-native/docs/performance)
