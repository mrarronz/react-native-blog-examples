import React from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import VictoryAnimation from "../widgets/VictoryAnimation";

const VictoryComponent = Animated.createAnimatedComponent(VictoryAnimation);

export default class CustomAnimComponent extends React.Component {
  
  render() {
    return (
      <View style={styles.container}>
        <VictoryComponent/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white'
  }
});
