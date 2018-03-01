import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Page3 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>这是第3个页面</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  }
});