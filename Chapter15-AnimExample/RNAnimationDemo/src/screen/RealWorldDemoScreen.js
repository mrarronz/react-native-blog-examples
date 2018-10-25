import React from 'react';
import {View, Text, FlatList, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from "./AnimatedUsageScreen";

const demoItems = [
  "添加商品到购物车动画1",
  "添加商品到购物车动画2",
  "二维码扫描动画",
  "菜单按钮动画",
  "弹窗动画",
  "自定义Loading动画",
  "模拟弹幕动画",
  "卡片缩放动画"
];

export class RealWorldDemoScreen extends React.Component {
  
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={demoItems}
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
          screen:'ShoppingButton',
          title:'添加商品到购物车动画1',
          navigatorStyle:{
            tabBarHidden: true
          }
        });
        break;
      case 1:
        this.props.navigator.push({
          screen:'ShoppingCart',
          title:'添加商品到购物车动画2',
          navigatorStyle:{
            tabBarHidden: true
          }
        });
        break;
      case 2:
        this.props.navigator.push({
          screen:'ScanQR',
          title:'二维码扫描动画',
          navigatorStyle:{
            tabBarHidden: true
          }
        });
        break;
      case 3:
        this.props.navigator.push({
          screen:'MenuButton',
          title:'菜单按钮动画',
          navigatorStyle:{
            tabBarHidden: true
          }
        });
        break;
      case 4:
        
        break;
      case 5:
        this.props.navigator.push({
          screen:'Loading',
          title:'Loading动画',
          navigatorStyle:{
            tabBarHidden: true
          }
        });
        break;
      case 6:
        this.props.navigator.push({
          screen:'Danmu',
          title:'模拟弹幕动画',
          navigatorStyle:{
            tabBarHidden: true
          }
        });
        break;
    }
  }
}