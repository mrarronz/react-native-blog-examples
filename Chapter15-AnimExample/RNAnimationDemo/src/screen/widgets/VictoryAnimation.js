import React from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';

export default class VictoryAnimation extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      animValue: new Animated.Value(0),
      isInitial: true,
    }
  }
  
  componentDidMount() {
    this.startAnimation();
  }
  
  startAnimation() {
    let initial = !this.state.isInitial;
    this.setState(
      {
        isInitial: initial
      },
      () => {
        let animationValue = this.state.isInitial ? 0 : 1;
        Animated.timing(
          this.state.animValue,
          {
            toValue: animationValue,
            duration: 500,
            easing: Easing.linear
          }
        ).start(() => this.startAnimation());
      }
    )
    
  }
  
  render() {
    return (
      <Animated.Image
        source={require('../../images/timg.jpg')}
        style={[
          styles.image,
          {
            transform: [
              {
                rotate: this.state.animValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['-30deg', '45deg']
                })
              }
            ]
          }
        ]}
      />
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  }
});