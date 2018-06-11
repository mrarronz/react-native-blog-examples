/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  TouchableHighlight,
} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>RN向原生传递数据</Text>
        {
          section1.map((item, index) => {
            return (
              <TouchableHighlight key={index} underlayColor={'#dcdcdc'} onPress={() => this.sectionOneItemClicked(index)}>
                <View style={styles.flexItem}>
                  <Text style={styles.itemTitle}>{item}</Text>
                </View>
              </TouchableHighlight>
            )
          })
        }
        <Text style={styles.sectionTitle}>RN从原生获取数据</Text>
        {
          section2.map((item, index) => {
            return (
              <TouchableHighlight key={index} underlayColor={'#dcdcdc'} onPress={() => this.sectionTwoItemClicked(index)}>
                <View style={styles.flexItem}>
                  <Text style={styles.itemTitle}>{item}</Text>
                </View>
              </TouchableHighlight>
            )
          })
        }
        <Text style={styles.sectionTitle}>RN监听原生事件、获取数据、页面跳转</Text>
        {
          section3.map((item, index) => {
            return (
              <TouchableHighlight key={index} underlayColor={'#dcdcdc'} onPress={() => this.sectionThreeItemClicked(index)}>
                <View style={styles.flexItem}>
                  <Text style={styles.itemTitle}>{item}</Text>
                </View>
              </TouchableHighlight>
            )
          })
        }
      </ScrollView>
    );
  }
  
  sectionOneItemClicked(index) {
    switch (index) {
      case 0:
        
        break;
      case 1:
        
        break;
      case 2:
        
        break;
    }
  }
  
  sectionTwoItemClicked(index) {
    switch (index) {
      case 0:
      
        break;
      case 1:
      
        break;
      case 2:
      
        break;
      case 3:
    
        break;
    }
  }
  
  sectionThreeItemClicked(index) {
    switch (index) {
      case 0:
      
        break;
      case 1:
      
        break;
    }
  }
  
}

const section1 = [
  'RN向原生传递String、Int等基本数据类型',
  'RN向原生传递字典',
  'RN向原生传递数组',
];

const section2 = [
  'RN调用原生方法获取回调数据——基本数据类型',
  'RN调用原生方法获取回调数据——字典',
  'RN调用原生方法获取回调数据——数组',
  'RN调用原生方法获取回调数据——Promise格式'
];

const section3 = [
  'RN获取原生端定义的常量',
  'RN监听原生端事件'
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: '#eeeeee',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight:'bold',
    color:'#101010',
    marginTop: 30,
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10
  },
  flexItem: {
    backgroundColor:'white',
    flexDirection:'row',
    alignItems:'center',
    padding: 10,
    borderBottomColor: '#d4d5d6',
    borderBottomWidth: 1,
  },
  itemTitle: {
    fontSize: 16,
    color:'#666'
  }
});
