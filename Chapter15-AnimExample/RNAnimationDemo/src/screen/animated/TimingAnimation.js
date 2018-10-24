import React from 'react';
import {View, Animated, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default class TimingAnimation extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      animValue: new Animated.Value(0),
      isExpand: true,
    }
  }
  
  render() {
    let buttonText = this.state.isExpand ? '放大' : '缩小';
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.box,
            {
              opacity: this.state.animValue,
              transform: [
                {scale: this.state.animValue}
              ]
            }
          ]}
        />
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
    Animated.timing(
      this.state.animValue,
      {
        toValue: 1.0,
      }
    ).start();
  }
  
  shrinkAnimation() {
    Animated.timing(
      this.state.animValue,
      {
        toValue: 0.2,
      }
    ).start();
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
    width: 200,
    height: 200,
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