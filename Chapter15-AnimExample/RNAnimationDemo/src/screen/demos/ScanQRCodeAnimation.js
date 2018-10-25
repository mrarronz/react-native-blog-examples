import React from 'react';
import {View, Animated, Easing, Text, Image, Dimensions, StyleSheet} from 'react-native';

export default class ScanQRCodeAnimation extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      animValue: new Animated.Value(0),
    };
  }
  
  componentDidMount() {
    this.startAnimation();
  }
  
  startAnimation(){
    Animated.timing(this.state.animValue,{
      toValue:1,
      duration:1500,
      easing:Easing.linear,
    }).start(()=>this.recycleAnimation());
  }
  
  recycleAnimation() {
    Animated.timing(this.state.animValue,{
      toValue:0,
      duration:1500,
      easing:Easing.linear,
    }).start(()=>this.startAnimation());
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topArea}/>
        <View style={{flexDirection:'row'}}>
          <View style={styles.itemStyle}/>
          <View style={styles.rectangle}>
            <Image
              style={[styles.rectangle, {position:'absolute', top: 0, left: 0}]}
              source={require('../../images/icon_scan_rect.png')}
            />
            <Animated.View style={[styles.animatedStyle, {
              transform: [{
                translateY: this.state.animValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, rectangleSize]
                })
              }]
            }]}>
            </Animated.View>
          </View>
          <View style={styles.itemStyle}/>
        </View>
        <View style={styles.bottomArea}>
          <Text style={styles.textStyle}>将二维码放入框内，即可自动扫描</Text>
        </View>
      </View>
    )
  }
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const rectangleSize = 200;
const topMargin = (screenHeight - 250)/3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  itemStyle:{
    backgroundColor:'rgba(0,0,0,0.5)',
    width:(screenWidth-rectangleSize)/2,
    height:rectangleSize
  },
  textStyle:{
    color:'#fff',
    marginTop:30,
    fontWeight:'bold',
    fontSize:18
  },
  animatedStyle:{
    height:2,
    backgroundColor:'#00c050'
  },
  rectangle: {
    height: rectangleSize,
    width: rectangleSize,
  },
  topArea: {
    height: topMargin,
    width: screenWidth,
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  bottomArea: {
    width: screenWidth,
    backgroundColor:'rgba(0,0,0,0.5)',
    flex: 1,
    alignItems:'center'
  }
});