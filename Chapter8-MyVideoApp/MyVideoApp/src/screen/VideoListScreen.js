import React from 'react';
import {ScrollView, View, Text, Image, TouchableHighlight, StyleSheet} from 'react-native';

const videoList = [
  "http://wvideo.spriteapp.cn/video/2016/0328/56f8ec01d9bfe_wpd.mp4",
  "http://baobab.wdjcdn.com/1456117847747a_x264.mp4",
  "http://baobab.wdjcdn.com/14525705791193.mp4",
  "http://baobab.wdjcdn.com/1456459181808howtoloseweight_x264.mp4",
  "http://baobab.wdjcdn.com/1455968234865481297704.mp4",
  "http://baobab.wdjcdn.com/1455782903700jy.mp4",
  "http://baobab.wdjcdn.com/14564977406580.mp4",
  "http://baobab.wdjcdn.com/1456316686552The.mp4",
  "http://baobab.wdjcdn.com/1456480115661mtl.mp4",
  "http://baobab.wdjcdn.com/1456665467509qingshu.mp4",
  "http://baobab.wdjcdn.com/1455614108256t(2).mp4",
  "http://baobab.wdjcdn.com/1456317490140jiyiyuetai_x264.mp4",
  "http://baobab.wdjcdn.com/1455888619273255747085_x264.mp4",
  "http://baobab.wdjcdn.com/1456734464766B(13).mp4",
  "http://baobab.wdjcdn.com/1456653443902B.mp4",
  "http://baobab.wdjcdn.com/1456231710844S(24).mp4"
];

export default class VideoListScreen extends React.Component {
  
  static navigationOptions = {
    headerTitle: '视频列表'
  };
  
  render() {
    return (
      <ScrollView style={styles.container}>
        {
          videoList.map((item, index) => {
            return (
              <TouchableHighlight key={index} underlayColor={'#dcdcdc'} onPress={() => {this.itemSelected(index)}}>
                <View style={styles.itemContainer}>
                  <Text style={styles.title}>视频{index+1}</Text>
                  <Image source={require('../image/icon_right.png')} style={styles.rightIcon}/>
                </View>
              </TouchableHighlight>
            )
          })
        }
      </ScrollView>
    )
  }
  
  itemSelected(index) {
    let videoUrl = videoList[index];
    this.props.navigation.navigate('VideoPlay', {url: videoUrl});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection:'row',
    alignItems:'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc'
  },
  title: {
    fontSize: 16,
    color: '#000',
    flex: 1
  },
  rightIcon: {
    width: 15,
    height: 15
  }
});