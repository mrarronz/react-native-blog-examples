import React from 'react';
import {View, Animated, Easing, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class LoadingAnimation extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      rotateValue1: new Animated.Value(0),
      rotateValue2: new Animated.Value(0),
    }
  }
  
  componentDidMount() {
    Animated.loop(
      Animated.timing(this.state.rotateValue1, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.in) // 匀速转动
      })
    ).start();
    Animated.loop(
      Animated.timing(this.state.rotateValue2, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.in) // 匀速转动
      })
    ).start();
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={{
          transform: [
            {rotate: this.state.rotateValue1.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
              })}
          ]
        }}>
          <Icon name={'loading'} size={80} color={'#888'}/>
        </Animated.View>
        <View style={styles.loadingBox}>
          <Animated.View style={{
            transform: [
              {rotate: this.state.rotateValue2.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg']
                })}
            ]
          }}>
            <Icon name={'loading'} size={40} color={'#fff'}/>
          </Animated.View>
          <Text style={styles.loadingText}>加载中...</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  loadingBox: {
    backgroundColor:'rgba(0, 0, 0, 0.7)',
    width: 200,
    height: 120,
    alignItems:'center',
    justifyContent:'center',
    padding: 15,
    marginTop: 50
  },
  loadingText: {
    fontSize: 15,
    color: 'white',
    marginTop: 15,
  }
});