import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Page2 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>这是第2个页面</Text>
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