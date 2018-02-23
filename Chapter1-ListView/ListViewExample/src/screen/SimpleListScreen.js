import React, {Component} from 'react';
import {View, ListView, Image, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';

export const data = [
  {
    image:require('../../assets/image/beer.png'),
    title:'啤酒',
  },
  {
    image:require('../../assets/image/bread.png'),
    title:'面包',
  },
  {
    image:require('../../assets/image/cake.png'),
    title:'蛋糕',
  },
  {
    image:require('../../assets/image/candy.png'),
    title:'糖果',
  },
  {
    image:require('../../assets/image/chili.png'),
    title:'辣椒',
  },
  {
    image:require('../../assets/image/chips.png'),
    title:'薯条',
  },
  {
    image:require('../../assets/image/drink.png'),
    title:'饮料',
  },
  {
    image:require('../../assets/image/egg.png'),
    title:'鸡蛋',
  },
  {
    image:require('../../assets/image/ham.png'),
    title:'火腿',
  },
  {
    image:require('../../assets/image/hotdog.png'),
    title:'热狗',
  },
  {
    image:require('../../assets/image/icecream.png'),
    title:'冰激凌',
  },
  {
    image:require('../../assets/image/icesucker.png'),
    title:'冰棍',
  },
  {
    image:require('../../assets/image/lemon.png'),
    title:'柠檬',
  },
  {
    image:require('../../assets/image/mushroom.png'),
    title:'蘑菇',
  },
  {
    image:require('../../assets/image/orange.png'),
    title:'橘子',
  },
  {
    image:require('../../assets/image/pizza.png'),
    title:'披萨',
  },
  {
    image:require('../../assets/image/radish.png'),
    title:'萝卜',
  },
  {
    image:require('../../assets/image/watermelon.png'),
    title:'西瓜',
  },
];

export default class SimpleListScreen extends Component {
  
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows(data)
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      </View>
    )
  }
  
  _renderRow = (rowData) => {
    return (
      <TouchableOpacity style={styles.cellContainer} onPress={() => {
        Alert.alert(
          rowData.title,
          '',
          [
            {text: 'OK', onPress: () => {}},
          ]
        )
      }}>
        <Image source={rowData.image} style={styles.image}/>
        <Text style={styles.title}>{rowData.title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cellContainer: {
    borderBottomWidth: 1,
    borderColor: '#dcdcdc',
    flexDirection:'row',
    alignItems:'center',
    padding:15
  },
  image: {
    width: 50,
    height: 50,
  },
  title: {
    marginLeft: 15,
  }
});