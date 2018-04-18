import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class ShareOptionView extends React.Component {
  
  static propTypes = {
    onShareItemSelected: PropTypes.func,
    onCloseWindow: PropTypes.func
  };
  
  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.container, this.props.style]}
        onPress={this._onTapBackground}
      >
        <Text style={styles.shareTitle}>分享至</Text>
        <View style={styles.shareMenuView}>
          {
            shareOptions.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.shareItem}
                  activeOpacity={0.8}
                  onPress={() => {this.shareItemSelectedAtIndex(index)}}
                >
                  <Image
                    source={item.imageRef}
                    style={styles.image}
                  />
                  <Text style={styles.title}>{item.title}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </TouchableOpacity>
    )
  }
  
  _onTapBackground = () => {
    this.props.onCloseWindow && this.props.onCloseWindow();
  };
  
  shareItemSelectedAtIndex(index) {
    this.props.onShareItemSelected && this.props.onShareItemSelected(index);
  }
}

const shareOptions = [
  {imageRef:require('../image/icon_share_qq.png'), title:'QQ'},
  {imageRef:require('../image/icon_share_qzone.png'), title:'QQ空间'},
  {imageRef:require('../image/icon_share_wxsession.png'), title:'微信'},
  {imageRef:require('../image/icon_share_wxtimeline.png'), title:'朋友圈'},
  {imageRef:require('../image/icon_share_sina.png'), title:'微博'},
  {imageRef:require('../image/icon_share_copylink.png'), title:'复制链接'},
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems:'center',
    justifyContent:'center'
  },
  shareMenuView: {
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems:'center',
    marginTop: 10,
    width: 300,
  },
  shareTitle: {
    fontSize: 16,
    color: 'white',
  },
  shareItem: {
    alignItems:'center',
    justifyContent:'center',
    margin: 20
  },
  image: {
    width:60,
    height:60
  },
  title: {
    marginTop: 5,
    fontSize:13,
    color: 'white'
  }
});