import React from 'react';
import {View, Animated, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default class SpringAnimation extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      width: new Animated.Value(50),
      height: new Animated.Value(50),
      isExpand: true,
    }
  }
  
  render() {
    let buttonText = this.state.isExpand ? '放大' : '缩小';
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.box, {width: this.state.width, height: this.state.height}]} />
        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() =>this.buttonClicked() }>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    )
  }
  
  buttonClicked() {
    if (this.state.isExpand) {
      // 放大
      this.setState(
        {
          isExpand: false,
        },
        () => {
          this.enlargeAnimation();
        }
      )
    } else {
      // 缩小
      this.setState(
        {
          isExpand: true,
        },
        () => {
          this.shrinkAnimation();
        }
      )
    }
  }
  
  enlargeAnimation() {
    // 不使用组合
    Animated.spring(this.state.width, {
      toValue: 200,
      friction: 3,
      tension: 40
    }).start();
    Animated.spring(this.state.height, {
      toValue: 200,
      friction: 3,
      tension: 40
    }).start();
  }
  
  shrinkAnimation() {
    // 这里使用parallel组合动画，使width和height同时执行动画.
    Animated.parallel([
      Animated.spring(this.state.width, {
        toValue: 50,
        friction: 3,
        tension: 40
      }),
      Animated.spring(this.state.height, {
        toValue: 50,
        friction: 3,
        tension: 40
      })
    ]).start();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  box: {
    backgroundColor:'#f54665'
  },
  button: {
    width:150,
    height:50,
    borderRadius:6,
    backgroundColor:'#41a2ff',
    alignItems:'center',
    justifyContent:'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  }
});