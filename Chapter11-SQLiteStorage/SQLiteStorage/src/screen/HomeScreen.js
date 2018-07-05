import React from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet, Image, DeviceEventEmitter} from 'react-native';

export default class HomeScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      studentList: []
    };
  }
  
  componentWillMount() {
    this.listener = DeviceEventEmitter.addListener('AddButtonPressed', () => {
      this.props.navigator.push({
        screen: 'AddItem',
        title: 'Add Student'
      });
    });
  }
  
  componentWillUnmount() {
    this.listener && this.listener.remove();
  }
  
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.studentList}
          keyExtractor={(item, index) => String(index)}
          renderItem={this._renderRow}
        />
      </View>
    )
  }
  
  _renderRow = (item) => {
    let student = item.item;
    return (
      <View/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#eeeeee'
  }
});