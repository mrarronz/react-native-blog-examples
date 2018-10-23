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
  
  _renderItem = ({item}) => {
    return (
      <TouchableHighlight underlayColor={'#ccc'} onPress={() =>this.onClickListItem(item)}>
        <View style={styles.listItem}>
          <Text style={styles.title}>{item}</Text>
          <Icon name={'chevron-right'} size={24} color={'#999'}/>
        </View>
      </TouchableHighlight>
    )
  };
  
  onClickListItem(item) {
  
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