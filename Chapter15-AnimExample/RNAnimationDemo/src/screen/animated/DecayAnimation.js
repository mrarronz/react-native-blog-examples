import React from 'react';
import {View, Animated, Easing, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default class DecayAnimation extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      leftDistance: new Animated.Value(10),
      topDistance: new Animated.Value(20),
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[
            styles.box,
            {
              left:this.state.leftDistance,
            }
        ]}/>
        <Animated.View
          style={[styles.boxContainer, {top: this.state.topDistance}]}
        />
        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() =>this.buttonClicked() }>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    )
  }
  
  buttonClicked() {
    this.startAnim();
  }
  
  startAnim() {
    Animated.sequence([
      Animated.decay(this.state.topDistance, {
        velocity: 10,
        deceleration: 0.7
      }),
      Animated.spring(this.state.topDistance, {
        toValue: 300,
        friction: 3,
        tension: 40,
      })
    ]).start();
    Animated.decay(this.state.leftDistance, {
      velocity: 50,
      deceleration: 0.7
    }).start();
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  box: {
    backgroundColor:'#f54665',
    width: 60,
    height: 60,
    position:'absolute',
    top: 200,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 100,
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
  },
  boxContainer: {
    backgroundColor:'#ffb131',
    width: 60,
    height: 60,
    position:'absolute',
    left: 150
  }
});