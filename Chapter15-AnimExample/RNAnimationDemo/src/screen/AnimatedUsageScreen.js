import React from 'react';
import {View, StatusBar, FlatList, Text, TouchableHighlight, StyleSheet, PixelRatio} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const animItems = [
  "spring",
  "timing",
  "decay",
  "interpolate插值函数",
  "组合动画",
  "创建自定义动画组件",
  "手势动画",
  "requestAnimationFrame",
  "原生驱动动画(useNativeDriver)"
];

export class AnimatedUsageScreen extends React.Component {
  
  constructor() {
    super();
    StatusBar.setBarStyle('light-content', true);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={animItems}
          renderItem={this._renderItem}
          keyExtractor={(index) => String(index)}
        />
      </View>
    )
  }
  
  _renderItem = ({item, index}) => {
    return (
      <TouchableHighlight underlayColor={'#ccc'} onPress={() =>this.onClickListItem(item, index)}>
        <View style={styles.listItem}>
          <Text style={styles.title}>{item}</Text>
          <Icon name={'chevron-right'} size={24} color={'#999'}/>
        </View>
      </TouchableHighlight>
    )
  };
  
  onClickListItem(item, index) {
    switch (index) {
      case 0:
        this.props.navigator.push({
          screen:'Spring',
          title:'Spring Animation',
          navigatorStyle:{
            tabBarHidden: true
          }
        });
        break;
      case 1:
        this.props.navigator.push({
          screen:'Timing',
          title:'Timing Animation',
          navigatorStyle:{
            tabBarHidden: true
          }
        });
        break;
      case 2:
        this.props.navigator.push({
          screen:'Decay',
          title:'Decay Animation',
          navigatorStyle:{
            tabBarHidden: true
          }
        });
        break;
      case 3:
        this.props.navigator.push({
          screen:'Interpolate',
          title:'Interpolate Animation',
          navigatorStyle:{
            tabBarHidden: true
          }
        });
        break;
      case 4:
        this.props.navigator.push({
          screen:'Group',
          title:'Group Animation',
          navigatorStyle:{
            tabBarHidden: true
          }
        });
        break;
      case 5:
        this.props.navigator.push({
          screen:'CustomComponent',
          title:'CreateAnimatedComponent',
          navigatorStyle:{
            tabBarHidden: true
          }
        });
        break;
      case 6:
        this.props.navigator.push({
          screen:'Gesture',
          title:'Gesture Animation',
          navigatorStyle:{
            tabBarHidden: true
          }
        });
        break;
      case 7:
        this.props.navigator.push({
          screen:'RequestFrame',
          title:'requestAnimationFrame',
          navigatorStyle:{
            tabBarHidden: true
          }
        });
        break;
      case 8:
        this.props.navigator.push({
          screen:'NativeDriver',
          title:'useNativeDriver',
          navigatorStyle:{
            tabBarHidden: true
          }
        });
        break;
    }
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  listItem: {
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:10,
    paddingRight: 10,
    height: 50,
    backgroundColor:'white',
    borderBottomColor: '#dcdcdc',
    borderBottomWidth:1/PixelRatio.get()
  },
  title: {
    fontSize: 15,
    color: '#666',
    flex: 1
  }
});