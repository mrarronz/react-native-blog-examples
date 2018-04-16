import React from 'react';
import {View, ScrollView, Text, Image, SafeAreaView, TouchableHighlight} from 'react-native';
import VideoPlayer, {defaultVideoHeight} from "../components/VideoPlayer";
import Orientation from "react-native-orientation";
import {videoList, styles} from "./VideoListScreen";

export default class VideoPlayScreen extends React.Component {
  
  static navigationOptions = {
    header: null
  };
  
  constructor(props) {
    super(props);
    this.state = {
      isFullScreen: false,
      currentUrl: this.props.navigation.state.params.url,
      videoHeight: defaultVideoHeight
    }
  }
  
  render() {
    return (
      <View style={styles.container} onLayout={this._onLayoutChange}>
        <ScrollView style={[styles.container, {marginTop: this.state.videoHeight}]}>
          {
            videoList.map((item, index) => {
              let isSelected = (this.state.currentUrl == item);
              return (
                <TouchableHighlight key={index} underlayColor={'#dcdcdc'} onPress={() => {this.itemSelected(item)}}>
                  <View style={styles.itemContainer}>
                    <Text style={[styles.title, isSelected ? styles.title_active : null]}>视频{index+1}</Text>
                    <Image source={require('../image/icon_right.png')} style={styles.rightIcon}/>
                  </View>
                </TouchableHighlight>
              )
            })
          }
        </ScrollView>
        <VideoPlayer
          ref={(ref) => this.videoPlayer = ref}
          style={{position:'absolute', left: 0, top: 0}}
          videoURL={this.state.currentUrl}
          videoTitle={'视频标题'}
          onChangeOrientation={this._onOrientationChanged}
          onTapBackButton={this._onClickBackButton}
        />
      </View>
    )
  }
  
  itemSelected(url) {
    this.setState({
      currentUrl: url
    });
    this.videoPlayer.updateVideo(url, 0, null);
  }
  
  _onOrientationChanged = (isFullScreen) => {
    if (isFullScreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
  };
  
  _onClickBackButton = () => {
    this.props.navigation.goBack();
  };
  
  _onLayoutChange = (event) => {
    let {x, y, width, height} = event.nativeEvent.layout;
    let isLandscape = (width > height);
    if (isLandscape) {
      this.setState({
        isFullScreen: true,
      });
      this.videoPlayer.updateLayout(width, height, true);
    } else {
      this.setState({
        isFullScreen: false
      });
      this.videoPlayer.updateLayout(width, width * 9/16, false);
    }
    Orientation.unlockAllOrientations();
  };
}