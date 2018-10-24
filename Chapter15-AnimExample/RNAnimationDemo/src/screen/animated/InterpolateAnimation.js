import React from 'react';
import {View, Easing, Animated, StyleSheet} from 'react-native';

export default class InterpolateAnimation extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      animValue: new Animated.Value(0),
    }
  }
  
  componentDidMount() {
    Animated.timing(
      this.state.animValue,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear
      }
    ).start();
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Animated.Image
          source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540373962855&di=6d6982d78ccbed5c8c735309708d625a&imgtype=0&src=http%3A%2F%2Fpic1.16pic.com%2F00%2F04%2F78%2F16pic_478386_b.jpg'}}
          style={[
            styles.image,
            {
              opacity: this.state.animValue,
              transform: [
                {scale: this.state.animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 2]
                  })},
                {rotate: this.state.animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg']
                  })}
              ]
            }
          ]}
        />
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
  image: {
    width: 200,
    height: 200,
  }
});