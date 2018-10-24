import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';

let count = 0;

export default class AnimateWithNativeDriver extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      width: 100,
      height: 100,
    }
  }
  
  componentDidMount() {
    this.startAnimation()
  }
  
  startAnimation() {
    if (count < 50) {
      while (++count < 50) {
        requestAnimationFrame(() => {
          this.image.setNativeProps({
            width: ++this.state.width,
            height: ++this.state.height,
          })
        });
      }
    } else {
      while (--count > 0) {
        requestAnimationFrame(() => {
          this.image.setNativeProps({
            width: --this.state.width,
            height: --this.state.height,
          })
        });
      }
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Image
          ref={(ref) => this.image = ref}
          source={require('../../images/timg.jpg')}
        />
        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() =>this.buttonClicked() }>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    )
  }
  
  buttonClicked() {
    this.startAnimation();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center'
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

