import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default class Page1 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>这是第1个页面</Text>
        <Button title={'点击跳转到详情'} onPress={()=>{
          this.props.navigation.navigate('Detail');
        }}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow'
  }
});