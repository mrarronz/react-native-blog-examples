import React, {Component} from 'react';
import {View, Text, Button, StatusBar, StyleSheet} from 'react-native';
import CustomTabs from './CustomTabs';

export default class RootPage extends Component {
  
  constructor(props) {
    super(props);
    StatusBar.setBarStyle('default');
  }
  
  render() {
    return (
      <CustomTabs/>
    )
  }
  
  switchTab(index: Number) {
    console.log('点击了index：' + index);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  tabView: {
    width: 84,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  mainView: {
    flex: 1,
  }
});