import React from 'react';
import {View, Animated, StyleSheet, PanResponder} from 'react-native';

export default class GestureAnimation extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      trans: new Animated.ValueXY(),
    };
    this.panGesture = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, {dx: this.state.trans.x, dy: this.state.trans.y}] // map gesture to leader
      ),
      onPanResponderRelease: () => {
        Animated.spring(
          this.state.trans,
          {
            toValue: {x: 0, y: 0}
          }
        ).start();
      },
      onPanResponderTerminate: () => {
        Animated.spring(
          this.state.trans,
          {
            toValue: {x: 0, y: 0}
          }
        ).start();
      }
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.animateView,
            {
              transform: [
                {translateX: this.state.trans.x},
                {translateY: this.state.trans.y}
              ]
            }
          ]}
          {...this.panGesture.panHandlers}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  animateView: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor:'#ffb131'
  }
});