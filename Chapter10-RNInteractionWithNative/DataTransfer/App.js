/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  NativeModules,
  DeviceEventEmitter,
  NativeEventEmitter,
  TouchableHighlight,
} from 'react-native';

const DataTransferModule = NativeModules.DataTransferModule;

type Props = {};
export default class App extends Component<Props> {
  
  componentDidMount() {
    this.listener = null;
    if (Platform.OS === 'ios') {
      let eventEmitter = new NativeEventEmitter(DataTransferModule);
      this.listener = eventEmitter.addListener("CustomEventName", (result) => {
        this.showAlert("获取到事件通知" + result);
      })
    } else {
      this.listener = DeviceEventEmitter.addListener("CustomEventName", (result) => {
        this.showAlert("获取到事件通知" + result);
      });
    }
  }
  
  componentWillUnmount() {
    this.listener && this.listener.remove();
  }
  
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
        DataTransferModule.getStringFromReactNative("哈哈哈");
        break;
      case 1:
        let dict = {id: '1', title: 'test'};
        DataTransferModule.getDictionaryFromRN(dict);
        break;
      case 2:
        let list = ["哈哈哈", "呵呵呵", "嘿嘿嘿", "傻笑三连"];
        DataTransferModule.getArrayFromRN(list);
        break;
    }
  }
  
  sectionTwoItemClicked(index) {
    switch (index) {
      case 0:
        DataTransferModule.passStringBackToRN((str) => {
          this.showAlert(str);
        });
        break;
      case 1:
        DataTransferModule.passDictionaryBackToRN((dict) => {
          console.log(dict);
          let name = dict.name;
          this.showAlert(name);
        });
        break;
      case 2:
        DataTransferModule.passArrayBackToRN((array) => {
          console.log(array);
          let joinString = array.join(', ');
          this.showAlert(joinString);
        });
        break;
      case 3:
        DataTransferModule.passPromiseBackToRN("Hello").then((result) => {
          console.log(result);
          if (result) {
            this.showAlert("获取promise成功");
          }
        }).catch((error) => {
          console.log(error);
          this.showAlert(error.message);
        });
        break;
    }
  }
  
  sectionThreeItemClicked(index) {
    switch (index) {
      case 0:
        let customConstant = DataTransferModule.CustomConstant;
        this.showAlert(customConstant);
        break;
      case 1:
        DataTransferModule.jumpToNativeView();
        break;
    }
  }
  
  showAlert(msg) {
    Alert.alert("显示结果", msg, [{text:'确定'}], {cancelable: false});
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
