import React, {Component} from 'react';
import {View, ListView, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';

export const vegetables = [
  {
    image:require('../../assets/image/chili.png'),
    title:'辣椒',
  },
  {
    image:require('../../assets/image/mushroom.png'),
    title:'蘑菇',
  },
  {
    image:require('../../assets/image/radish.png'),
    title:'萝卜',
  },
];
export const fruits = [
  {
    image:require('../../assets/image/lemon.png'),
    title:'柠檬',
  },
  {
    image:require('../../assets/image/orange.png'),
    title:'橘子',
  },
  {
    image:require('../../assets/image/watermelon.png'),
    title:'西瓜',
  },
];
export const others = [
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
    image:require('../../assets/image/pizza.png'),
    title:'披萨',
  },
];

export default class SectionListScreen extends Component {
  
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    let data = [vegetables, fruits, [others]];
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(data)
    }
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSectionHeader={this._renderSectionHeader}
        />
      </View>
    )
  }
  
  _renderRow = (item, sectionId) => {
    let sectionIndex = Number(sectionId);
    if (sectionIndex === 2) {
      return (
        <View style={styles.gridContainer}>
          {
            item.map((itemData, index) => {
              return (
                <TouchableOpacity key={index} style={styles.gridItem}>
                  <Image source={itemData.image} style={styles.gridImage}/>
                  <Text style={styles.gridTitle}>{itemData.title}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
      )
    }
    return (
      <TouchableOpacity style={styles.cellContainer} onPress={() => {}}>
        <Image source={item.image} style={styles.image}/>
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    )
  };
  
  _renderSectionHeader = (sectionData, sectionId) => {
    let sectionIndex = Number(sectionId);
    let category = '';
    switch (sectionIndex) {
      case 0:
        category = '蔬菜';
        break;
      case 1:
        category = '水果';
        break;
      case 2:
        category = '其它';
        break;
    }
    return (
      <View style={styles.sectionHeader}>
        <Text>{category}</Text>
      </View>
    )
  };
}

export const styles = StyleSheet.create({
  sectionHeader: {
    padding: 10,
    backgroundColor: '#f0f0f0'
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
  },
  gridContainer: {
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  gridItem: {
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor:'#dcdcdc',
    width:100,
    height: 100,
    marginTop: 20,
  },
  gridImage: {
    width: 60,
    height: 60,
  },
  gridTitle: {
    marginTop: 10
  }
});