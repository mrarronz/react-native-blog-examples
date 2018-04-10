import React from 'react';
import {View, StyleSheet} from 'react-native';
import VideoPlayer from "../components/VideoPlayer";
import Orientation from "react-native-orientation";

export default class VideoPlayScreen extends React.Component {
  
  static navigationOptions = {
    header: null
  };
  
  constructor(props) {
    super(props);
    this.state = {
      isFullScreen: false
    }
  }
  
  render() {
    return (
      <View style={styles.container} onLayout={this._onLayoutChange}>
        <VideoPlayer
          ref={(ref) => this.videoPlayer = ref}
          videoURL={this.props.navigation.state.params.url}
          videoTitle={'视频标题'}
          onChangeOrientation={this._onOrientationChanged}
          onTapBackButton={this._onClickBackButton}
        />
      </View>
    )
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});