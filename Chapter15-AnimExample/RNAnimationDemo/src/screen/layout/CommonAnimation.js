import React from 'react';
import {View, LayoutAnimation, TouchableOpacity, Text, StyleSheet, NativeModules} from 'react-native';

export default class CommonAnimation extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      width: 100,
      height: 100,
    };
    ///下面代码是必须要添加的，否则没有动画效果，这里iOS是默认开启LayoutAnimation的，只针对android
    let UIManager= NativeModules.UIManager;
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.box, {width: this.state.width, height: this.state.height}]} />
        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() =>this.buttonClicked() }>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    )
  }
  
  buttonClicked() {
    LayoutAnimation.spring();
    this.setState({
      width: this.state.width + 20,
      height: this.state.height + 20,
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  box: {
    backgroundColor:'#666'
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