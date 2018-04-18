import React from 'react';
import {ScrollView, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {videoList} from "../screen/VideoListScreen";
import {onePixel} from "./MoreSettingView";

export default class SelectVideoView extends React.Component {
  
  static defaultProps = {
    currentUrl: null
  };
  
  static propTypes = {
    onItemSelected: PropTypes.func,
    onCloseWindow: PropTypes.func
  };
  
  constructor(props) {
    super(props);
    this.state = {
      currentUrl: this.props.currentUrl
    }
  }
  
  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.container, this.props.style]}
        onPress={this._onTapBackground}
      >
        <ScrollView contentContainerStyle={styles.optionView} showsVerticalScrollIndicator={false}>
          {
            videoList.map((item, index) => {
              let isSelected = (this.state.currentUrl == item);
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.7}
                  style={[styles.optionItem, isSelected ? styles.optionItem_active : null]}
                  onPress={() => {this.onTapItemAtIndex(item)}}
                >
                  <Text style={[styles.optionText, isSelected ? styles.optionText_active: null]}>这是视频{index+1}</Text>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </TouchableOpacity>
    )
  }
  
  _onTapBackground = () => {
    this.props.onCloseWindow && this.props.onCloseWindow();
  };
  
  onTapItemAtIndex(videoUrl) {
    this.setState({
      currentUrl: videoUrl
    });
    this.props.onItemSelected && this.props.onItemSelected(videoUrl);
  }
  
  updateVideo(url) {
    this.setState({
      currentUrl: url
    })
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems:'center',
    justifyContent:'center'
  },
  optionView: {
    alignItems:'center',
    justifyContent:'center',
  },
  optionItem: {
    width: 200,
    height: 50,
    alignItems:'center',
    justifyContent:'center',
    paddingLeft:10,
    paddingRight: 10,
    borderBottomWidth: onePixel,
    borderColor: 'white'
  },
  optionItem_active: {
    borderColor: '#ff5500',
  },
  optionText: {
    fontSize: 15,
    color: 'white'
  },
  optionText_active: {
    color: '#ff5500'
  }
});