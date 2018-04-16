import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Slider,
  TouchableWithoutFeedback,
  ActivityIndicator,
  StyleSheet,
  BackHandler
} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import {isIPhoneX, isSystemIOS, screenHeight, screenWidth} from "./VideoPlayer";

export default class VideoPlayerScreen extends React.Component {
  
  static navigationOptions = {
    header: null
  };
  
  constructor(props) {
    super(props);
    this.state = {
      videoUrl: props.navigation.state.params.url,
      videoCover: '',
      x: 0,
      y: topInset,
      videoWidth: screenWidth,
      videoHeight: videoHeight,
      showVideoCover: false,
      isShowControl: true,
      isPaused: false,
      showLoading: true,
      isFullScreen: false,
      currentTime: 0,
      duration: 0,
      playFromBeginning: false,  // 下次播放是否应该从头开始
    };
    BackHandler.addEventListener('hardwareBackPress', this._backButtonPress);
  }
  
  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this._backButtonPress);
  }
  
  render() {
    return (
      <View style={styles.container} onLayout={this._onLayoutChange}>
        <View style={{position:'absolute', left: this.state.x, top: this.state.y, width: this.state.videoWidth, height: this.state.videoHeight}}>
          <Video
            ref={(ref) => this.videoPlayer = ref}
            source={{uri: this.state.videoUrl}}
            rate={1.0}
            volume={1.0}
            muted={false}
            paused={this.state.isPaused}
            resizeMode={'contain'}
            playWhenInactive={false}
            playInBackground={false}
            ignoreSilentSwitch={'ignore'}
            progressUpdateInterval={250.0}
            onLoadStart={this._onLoadStart}
            onLoad={this._onLoaded}
            onProgress={this._onProgressChanged}
            onEnd={this._onPlayEnd}
            onError={this._onPlayError}
            onBuffer={this._onBuffering}
            style={{width: this.state.videoWidth, height: this.state.videoHeight}}
          />
          {
            this.state.showVideoCover ?
              <Image
                style={{
                  position:'absolute',
                  top: 0,
                  left: 0,
                  width: this.state.videoWidth,
                  height: this.state.videoHeight
                }}
                resizeMode={'cover'}
                source={{uri: this.state.videoCover}}
              /> : null
          }
          {
            this.state.showLoading ?
              <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: this.state.videoWidth,
                height: this.state.videoHeight,
                backgroundColor: 'transparent',
                alignItems:'center',
                justifyContent:'center'
              }}>
                <ActivityIndicator size='large'/>
                <Text style={{
                  fontSize: 16,
                  color: '#666',
                }}>视频加载中</Text>
              </View> : null
          }
          <TouchableWithoutFeedback onPress={() => { this.hideControl() }}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: this.state.videoWidth,
                height: this.state.videoHeight,
                backgroundColor: this.state.isPaused ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                alignItems:'center',
                justifyContent:'center'
              }}>
              {
                this.state.isPaused ?
                  <TouchableWithoutFeedback onPress={() => { this.onPressPlayButton() }}>
                    <Image
                      style={styles.playButton}
                      source={require('../image/icon_video_play.png')}
                    />
                  </TouchableWithoutFeedback> : null
                
              }
            </View>
          </TouchableWithoutFeedback>
          {
            this.state.isShowControl ?
              <View style={[styles.bottomControl, {width: this.state.videoWidth}]}>
                <TouchableOpacity style={styles.control_play_btn} activeOpacity={0.3} onPress={() => { this.onControlPlayPress() }}>
                  <Image
                    style={styles.playControl}
                    source={this.state.isPaused ? require('../image/icon_control_play.png') : require('../image/icon_control_pause.png')}
                  />
                </TouchableOpacity>
                <Text style={styles.time}>{formatTime(this.state.currentTime)}</Text>
                <Slider
                  style={{flex: 1}}
                  maximumTrackTintColor={'#999999'}
                  minimumTrackTintColor={'#00c06d'}
                  thumbImage={require('../image/icon_control_slider.png')}
                  value={this.state.currentTime}
                  minimumValue={0}
                  maximumValue={this.state.duration}
                  onValueChange={(currentTime) => { this.onSliderValueChanged(currentTime) }}
                />
                <Text style={styles.time}>{formatTime(this.state.duration)}</Text>
                <TouchableOpacity style={styles.control_play_btn} activeOpacity={0.3} onPress={() => { this.onControlShrinkPress() }}>
                  <Image
                    style={styles.shrinkControl}
                    source={this.state.isFullScreen ? require('../image/icon_control_shrink_screen.png') : require('../image/icon_control_full_screen.png')}
                  />
                </TouchableOpacity>
              </View> : null
          }
          {
            this.state.isShowControl ?
              <View
                style={{
                  position:'absolute',
                  top: 0,
                  left: 0,
                  width: this.state.videoWidth,
                  height: topBarHeight,
                  backgroundColor:'rgba(0, 0, 0, 0.8)',
                  flexDirection:'row',
                  alignItems:'center'
                }}>
                <TouchableOpacity style={styles.backButton} onPress={() => this.onBackButtonClick()}>
                  <Image
                    source={require('../image/icon_back.png')}
                    style={{width: 26, height: 26}}
                  />
                </TouchableOpacity>
                <Text style={{fontSize: 16, color:'white'}}>视频标题</Text>
              </View>:null
          }
        </View>
      </View>
    )
  }
  
  /// 处理安卓物理返回键，横屏时点击返回键回到竖屏，再次点击回到上个界面
  _backButtonPress = () => {
    if (this.state.isFullScreen) {
      Orientation.lockToPortrait();
    } else {
      this.props.navigation.goBack();
    }
    return true;
  };
  
  /// 屏幕旋转时宽高发生变化
  _onLayoutChange = (event) => {
    let {x, y, width, height} = event.nativeEvent.layout;
    console.log('x: ' + x);
    console.log('y: ' + y);
    console.log('width: ' + width);
    console.log('height: ' + height);
    
    let isLandscape = (width > height);
    if (isLandscape) {
      this.setState({
        x: topInset,
        y: 0,
        videoWidth: width - topInset - topInset,
        videoHeight: height,
        isFullScreen: true,
      })
    } else {
      this.setState({
        x: 0,
        y: topInset,
        videoWidth: width,
        videoHeight: videoHeight,
        isFullScreen: false,
      })
    }
    Orientation.unlockAllOrientations();
  };
  
  /// Video组件的方法
  
  _onBuffering = () => {
    console.log('视频缓冲中...');
  };
  
  _onLoadStart = () => {
    console.log('视频开始加载...');
  };
  
  _onLoaded = (data) => {
    console.log('视频加载完成');
    this.setState({
      duration: data.duration,
    })
  };
  
  _onProgressChanged = (data) => {
    if (!this.state.isPaused) {
      this.setState({
        currentTime: data.currentTime,
        showLoading: false
      })
    }
  };
  
  _onPlayEnd = () => {
    console.log('播放结束');
    this.setState({
      currentTime: 0,
      isPaused: true,
      // showVideoCover: true,
      playFromBeginning: true,
    });
  };
  
  _onPlayError = () => {
    console.log('视频播放失败');
  };
  
  /// 控制播放器工具栏的显示和隐藏
  hideControl() {
    let value = !this.state.isShowControl;
    this.setState({
      isShowControl: value,
    })
  }
  
  /// 点击了播放器正中间的播放按钮
  onPressPlayButton() {
    let isPaused = !this.state.isPaused;
    let isShowControl = false;
    if (!isPaused) {
      isShowControl = true;
    }
    this.setState({
      isPaused: isPaused,
      showVideoCover: false,
      isShowControl: isShowControl
    });
    if (this.state.playFromBeginning) {
      this.videoPlayer.seek(0);
      this.setState({
        playFromBeginning: false,
      })
    }
  }
  
  /// 点击了工具栏上的播放按钮
  onControlPlayPress() {
    this.onPressPlayButton();
  }
  
  /// 点击了工具栏上的全屏按钮
  onControlShrinkPress() {
    if (this.state.isFullScreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscapeRight();
    }
  }
  
  /// 进度条值改变
  onSliderValueChanged(currentTime) {
    this.videoPlayer.seek(currentTime);
    if (this.state.isPaused) {
      this.setState({
        isPaused: false,
        showVideoCover: false
      })
    }
  }
  
  onBackButtonClick() {
    if (this.state.isFullScreen) {
      Orientation.lockToPortrait();
    } else {
      this.props.navigation.goBack();
    }
  }
  
}

export const topInset = isIPhoneX ? 44 : 0;
const bottomInset = isIPhoneX ? 34 : 0;
const bottomMargin = isSystemIOS ? 0 : 20;
const videoHeight = screenHeight - topInset - bottomInset - bottomMargin;
const topBarHeight = isSystemIOS ? 64 : 50;
const bottomBarHeight = 50;

export function formatTime(second) {
  let h = 0, i = 0, s = parseInt(second);
  if (s > 60) {
    i = parseInt(s / 60);
    s = parseInt(s % 60);
  }
  // 补零
  let zero = function (v) {
    return (v >> 0) < 10 ? "0" + v : v;
  };
  return [zero(h), zero(i), zero(s)].join(":");
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#000'
  },
  playButton: {
    width: 50,
    height: 50,
  },
  playControl: {
    width: 24,
    height: 24,
    marginLeft: 5,
  },
  shrinkControl: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  time: {
    fontSize: 12,
    color: 'white',
    marginLeft: 5,
    marginRight: 5
  },
  bottomControl: {
    flexDirection: 'row',
    height: bottomBarHeight,
    alignItems:'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  backButton: {
    flexDirection:'row',
    width: 44,
    height: 44,
    alignItems:'center',
    justifyContent:'center',
    marginLeft: 10
  },
  control_play_btn: {
    width: 44,
    height: bottomBarHeight,
    alignItems:'center',
    justifyContent:'center',
  }
});