import React from 'react';
import {
  View,
  Text,
  Image,
  Slider,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  DeviceInfo,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import Video from 'react-native-video';
import Orientation from "react-native-orientation";
import SelectDefinitionView from "./SelectDefinitionView";
import SelectVideoView from "./SelectVideoView";
import ShareOptionView from "./ShareOptionView";
import MoreSettingView from "./MoreSettingView";

export default class VideoPlayer extends React.Component {

  static propTypes = {
    onChangeOrientation: PropTypes.func,
    onTapBackButton: PropTypes.func
  };
  
  static defaultProps = {
    videoWidth: screenWidth,    // 默认视频宽度，竖屏下为屏幕宽度
    videoHeight: defaultVideoHeight, // 默认视频高度，竖屏下为宽度的9/16，使视频保持16：9的宽高比
    videoURL: '',    // 视频的地址
    videoCover: '',  // 视频的封面图地址
    videoTitle: '',  // 视频的标题
    enableSwitchScreen: true, // 是否允许视频切换大小
    tag: 0
  };
  
  constructor(props) {
    super(props);
    let hasCover = true;
    if (this.props.videoCover == null || this.props.videoCover === '') {
      hasCover = false;
    }
    this.state = {
      x: 0,
      videoWidth: screenWidth,
      videoHeight: defaultVideoHeight,
      videoUrl: this.props.videoURL,
      videoCover: this.props.videoCover,
      videoTitle: this.props.videoTitle,
      hasCover: hasCover, // 是否有视频封面
      isPaused: true,  // 是否暂停，控制视频的播放和暂停
      duration: 0,     // 视频的时长
      currentTime: 0,  // 视屏当前播放的时间
      isFullScreen: false, // 是否全屏
      isShowControl: false, // 是否显示播放的工具栏
      isShowVideoCover: hasCover, // 是否显示视频封面
      playFromBeginning: false, // 视频是否需要从头开始播放
      isMuted: false,  // 是否静音
      volume: 1.0,   // 音量大小
      playRate: 1.0, // 播放速率
      lastSingleTapTime: 0,   //上次单点击视频区域的时间
      isDefinitionShow: false, // 是否显示清晰度切换界面
      isVideoListShow: false,  // 是否显示选集界面
      isShareMenuShow: false,  // 是否显示分享界面
      isSettingViewShow: false, // 是否显示设置界面
    }
  }
  
  render() {
    return (
      <View
        style={[{width: this.state.videoWidth, height: this.state.videoHeight,backgroundColor:'#000'}, this.props.style]}>
        <Video
          ref={(ref) => { this.videoRef = ref }}
          source={{uri: this.state.videoUrl}}
          resizeMode="contain"
          rate={this.state.playRate}
          volume={this.state.volume}
          muted={this.state.isMuted}
          ignoreSilentSwitch={"ignore"}
          style={{position:'absolute', left: this.state.x, top: 0, width: this.state.videoWidth-2*this.state.x, height: this.state.videoHeight}}
          paused={this.state.isPaused}
          onLoadStart={this._onLoadStart}
          onBuffer={this._onBuffering}
          onLoad={this._onLoad}
          onProgress={this._onProgressChange}
          onEnd={this._onPlayEnd}
          onError={this._onPlayError}
          playInBackground={false}
          playWhenInactive={false}
        />
        {
          this.state.hasCover && this.state.isShowVideoCover ?
            <Image
              style={{position: 'absolute', top: 0, left: 0, width: this.state.videoWidth, height: this.state.videoHeight}}
              source={{uri: this.state.videoCover}}
            /> : null
        }
        <TouchableWithoutFeedback onPress={this._onTapVideo}>
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
                <TouchableWithoutFeedback onPress={this._onTapPlayButton}>
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
              <Image
                source={require('../image/img_bottom_shadow.png')}
                style={{position:'absolute', top: 0, left: 0, width: this.state.videoWidth, height:50}}
              />
              <TouchableOpacity activeOpacity={0.3} onPress={this._onTapPlayButton}>
                <Image
                  style={styles.control_play_btn}
                  source={this.state.isPaused ? require('../image/icon_control_play.png') : require('../image/icon_control_pause.png')}
                />
              </TouchableOpacity>
              <Text style={styles.timeText}>{formatTime(this.state.currentTime)}</Text>
              <Slider
                style={{flex: 1}}
                maximumTrackTintColor={'#999999'}//滑块右侧轨道的颜色
                minimumTrackTintColor={'#00c06d'}//滑块左侧轨道的颜色
                thumbImage={require('../image/icon_control_slider.png')}
                value={this.state.currentTime}
                minimumValue={0}
                maximumValue={Number(this.state.duration)}
                onValueChange={this._onSliderValueChange}
              />
              <Text style={styles.timeText}>{formatTime(this.state.duration)}</Text>
              {
                this.props.enableSwitchScreen ?
                  <TouchableOpacity activeOpacity={0.3} onPress={this._onTapSwitchButton}>
                    <Image
                      style={styles.control_switch_btn}
                      source={this.state.isFullScreen ? require('../image/icon_control_shrink_screen.png') : require('../image/icon_control_full_screen.png')}
                    />
                  </TouchableOpacity> : null
              }
              {
                this.state.isFullScreen ?
                  <View style={styles.bottomOptionView}>
                    <TouchableOpacity onPress={this._onTapDefinitionButton}>
                      <Text style={styles.bottomOptionText}>高清</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._onTapSelectVideo}>
                      <Text style={[styles.bottomOptionText, {marginLeft: 10}]}>选集</Text>
                    </TouchableOpacity>
                  </View>: null
              }
            </View> : null
        }
        {
          this.state.isFullScreen && this.state.isShowControl ?
            <View
              style={{
                position:'absolute',
                top: 0,
                left: 0,
                width: this.state.videoWidth,
                height: 50,
                flexDirection:'row',
                alignItems:'center'
              }}>
              <Image
                source={require('../image/img_top_shadow.png')}
                style={{position:'absolute', top: 0, left: 0, width: this.state.videoWidth, height:50}}
              />
              <TouchableOpacity style={styles.backButton} onPress={this._onTapBackButton}>
                <Image
                  source={require('../image/icon_back.png')}
                  style={{width: 26, height: 26}}
                />
              </TouchableOpacity>
              <Text style={styles.videoTitle} numberOfLines={1}>{this.state.videoTitle}</Text>
              {
                this.state.isFullScreen ?
                  <View style={styles.topOptionView}>
                    <TouchableOpacity style={styles.topOptionItem} onPress={this._onTapCaptureImage}>
                      <Image
                        source={require('../image/icon_video_capture.png')}
                        style={{width: 26, height: 26}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topOptionItem} onPress={this._onTapAirplayButton}>
                      <Image
                        source={require('../image/icon_video_airplay.png')}
                        style={styles.topImageOption}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topOptionItem} onPress={this._onTapShareButton}>
                      <Image
                        source={require('../image/icon_video_share.png')}
                        style={{width: 22, height: 22}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topOptionItem} onPress={this._onTapMoreButton}>
                      <Image
                        source={require('../image/icon_video_more.png')}
                        style={styles.topImageOption}
                      />
                    </TouchableOpacity>
                  </View> : null
              }
            </View> : null
        }
        {
          this.state.isFullScreen ? null :
            <TouchableOpacity
              style={{
                position:'absolute',
                top: 10,
                left: 10,
                width: 44,
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={this._onTapBackButton}
            >
              <Image
                source={require('../image/icon_back.png')}
                style={{width: 26, height: 26}}
              />
            </TouchableOpacity>
        }
        {
          this.state.isFullScreen && this.state.isDefinitionShow ?
            <SelectDefinitionView
              selectedIndex={2}
              style={{
                position:'absolute',
                top: 0,
                left: 0,
                width: this.state.videoWidth,
                height: this.state.videoHeight,
              }}
              onItemSelected={(index) => this.onDefinitionItemSelected(index)}
              onCloseWindow={() => { this.setState({isDefinitionShow: false}) }}
            /> : null
        }
        {
          this.state.isFullScreen && this.state.isVideoListShow ?
            <SelectVideoView
              currentUrl={this.state.videoUrl}
              style={{
                position:'absolute',
                top: 0,
                left: 0,
                width: this.state.videoWidth,
                height: this.state.videoHeight,
              }}
              onItemSelected={(url) => this.onVideoListSwitch(url)}
              onCloseWindow={() => { this.setState({isVideoListShow: false}) }}
            /> : null
        }
        {
          this.state.isFullScreen && this.state.isShareMenuShow ?
            <ShareOptionView
              style={{
                position:'absolute',
                top: 0,
                left: 0,
                width: this.state.videoWidth,
                height: this.state.videoHeight,
              }}
              onShareItemSelected={(index) => {this.onShareMenuPressed(index)}}
              onCloseWindow={() => { this.setState({isShareMenuShow: false}) }}
            /> : null
        }
        {
          this.state.isFullScreen && this.state.isSettingViewShow ?
            <MoreSettingView
              style={{
                position:'absolute',
                top: 0,
                left: 0,
                width: this.state.videoWidth,
                height: this.state.videoHeight,
              }}
              isMuted={this.state.isMuted}
              volume={this.state.volume}
              selectedRate={this.state.playRate}
              selectedEndTimeIndex={0}
              onFavoriteTapped={() => { this.setState({isSettingViewShow: false}) }}
              onDownloadTapped={() => { this.setState({isSettingViewShow: false}) }}
              onMuteVolumeTapped={(isMute) => { this.onMuteVolume(isMute); }}
              onPlayRateChanged={(rate) => { this.onPlayRateChange(rate); }}
              onEndTimeSelected={(index) => { this.onEndTimeChange(index); }}
              onCloseWindow={() => { this.setState({isSettingViewShow: false}) }}
              onVolumeChange={(volume) => { this.onVolumeChanged(volume); }}
            /> : null
        }
      </View>
    )
  }
  
  /// -------播放器回调事件方法-------
  
  _onLoadStart = () => {
    console.log('视频开始加载...');
  };
  
  _onBuffering = () => {
    console.log('视频缓冲中...');
  };
  
  _onLoad = (data) => {
    console.log('视频加载完成');
    this.setState({
      duration: data.duration,
    });
  };
  
  //进度
  _onProgressChange = (data) => {
    if (!this.state.isPaused) {
      this.setState({
        currentTime: data.currentTime,
      })
    }
  };
  
  //视频播放结束触发的方法
  _onPlayEnd = () => {
    console.log('播放结束');
    this.setState({
      currentTime: 0,
      isPaused: true,
      playFromBeginning: true,
      isShowVideoCover: this.state.hasCover
    });
  };
  
  _onPlayError = () => {
    console.log('视频播放失败');
  };
  
  /// -------控件点击事件-------
  
  _onTapVideo = () => {
    let isShow = !this.state.isShowControl;
    this.setState({
      isShowControl: isShow,
    })
  };
  
  _onTapPlayButton = () => {
    let isPause = !this.state.isPaused;
    let isShowControl = false;
    if (!isPause) {
      isShowControl = true;
    }
    this.setState({
      isPaused: isPause,
      isShowControl: isShowControl,
      isShowVideoCover: false
    });
    if (this.state.playFromBeginning) {
      this.videoRef.seek(0);
      this.setState({
        playFromBeginning: false,
      })
    }
  };
  
  _onSliderValueChange = (currentTime) => {
    this.videoRef.seek(currentTime);
    if (this.state.isPaused) {
      this.setState({
        isPaused: false,
        isShowVideoCover: false
      })
    }
  };
  
  // 点击展开全屏或收起全屏
  _onTapSwitchButton = () => {
    this.props.onChangeOrientation && this.props.onChangeOrientation(this.state.isFullScreen);
  };
  
  // 点击返回键
  _onTapBackButton = () => {
    if (this.state.isFullScreen) {
      Orientation.lockToPortrait();
    } else {
      this.props.onTapBackButton && this.props.onTapBackButton();
    }
  };
  
  // 点击切换清晰度
  _onTapDefinitionButton = () => {
    this.setState({
      isDefinitionShow: true,
      isShowControl: false
    })
  };
  
  // 点击选集
  _onTapSelectVideo = () => {
    this.setState({
      isVideoListShow: true,
      isShowControl: false
    })
  };
  
  // 点击截屏
  _onTapCaptureImage = () => {
  
  };
  
  // 点击AirPlay
  _onTapAirplayButton = () => {
  
  };
  
  // 点击分享
  _onTapShareButton = () => {
    this.setState({
      isShareMenuShow: true,
      isShowControl: false
    })
  };
  
  // 点击更多
  _onTapMoreButton = () => {
    this.setState({
      isSettingViewShow: true,
      isShowControl: false
    })
  };
  
  onDefinitionItemSelected(index) {
    this.setState({
      isDefinitionShow: false
    })
  }
  
  onVideoListSwitch(url) {
    this.updateVideo(url, 0, null);
    this.setState({
      isVideoListShow: false
    })
  }
  
  onShareMenuPressed(index) {
    this.setState({
      isShareMenuShow: false
    })
  }
  
  onMuteVolume(isMute) {
    let volume = this.state.volume;
    if (!isMute && volume === 0) {
      volume = 1.0;
    }
    this.setState({
      isMuted: isMute,
      volume: volume,
      isSettingViewShow: false
    })
  }
  
  onPlayRateChange(rate) {
    this.setState({
      playRate: rate,
      isSettingViewShow: false
    })
  }
  
  onEndTimeChange(index) {
  
  }
  
  onVolumeChanged(volume) {
    let isMute = (volume === 0);
    this.setState({
      volume: volume,
      isMuted: isMute
    })
  }
  
  /// --------外部调用方法--------
  
  updateVideo(videoUrl, seekTime, videoTitle) {
    let title = (videoTitle != null) ? videoTitle : this.state.videoTitle;
    this.setState({
      videoUrl: videoUrl,
      videoTitle: title,
      isPaused: false,
      isShowVideoCover: false,
    });
    this.videoRef.seek(seekTime);
  }
  
  updateLayout(width, height, isFullScreen) {
    let xPadding = 0;
    if (isFullScreen) {
      // 全屏模式下iPhone X左右两边需要留出状态栏的部分，避免视频被刘海遮住
      xPadding = isIPhoneX ? statusBarHeight : 0;
    }
    this.setState({
      x: xPadding,
      videoWidth: width,
      videoHeight: height,
      isFullScreen: isFullScreen
    })
  }
  
  stop() {
    this.setState({
      isPaused: true,
      currentTime: 0
    })
  }
  
}

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
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
export const defaultVideoHeight = screenWidth * 9/16;
export const isIPhoneX = DeviceInfo.isIPhoneX_deprecated;
export const statusBarHeight = isIPhoneX ? 44 : 20;
export const isSystemIOS = (Platform.OS === 'ios');

const styles = StyleSheet.create({
  playButton: {
    width: 50,
    height: 50,
  },
  bottomControl: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  timeText: {
    fontSize: 13,
    color: 'white',
    marginLeft: 10,
    marginRight: 10
  },
  videoTitle: {
    fontSize: 14,
    color: 'white',
    flex: 1,
    marginRight: 10,
  },
  control_play_btn: {
    width: 24,
    height: 24,
    marginLeft: 15
  },
  control_switch_btn: {
    width: 15,
    height: 15,
    marginRight: 15
  },
  backButton: {
    flexDirection:'row',
    width: 44,
    height: 44,
    alignItems:'center',
    justifyContent:'center',
    marginLeft: 10
  },
  bottomOptionView: {
    flexDirection: 'row',
    alignItems:'center',
    marginRight: 15,
    height: 50
  },
  bottomOptionText: {
    fontSize: 14,
    color: 'white',
  },
  topOptionView: {
    flexDirection: 'row',
    alignItems:'center',
    marginRight: 15,
    height: 50
  },
  topOptionItem: {
    width: 50,
    height: 50,
    alignItems:'center',
    justifyContent:'center'
  },
  topImageOption: {
    width: 24,
    height: 24
  }
});