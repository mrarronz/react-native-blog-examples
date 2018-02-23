import React, {Component} from 'react';
import {View, ListView, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import {fruits, others, vegetables, styles} from "./SectionListScreen";

export default class GroupListScreen extends Component {
  
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
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      });
      let data = ds.cloneWithRows(item);
      return (
        <ListView
          contentContainerStyle={styles.gridContainer}
          dataSource={data}
          renderRow={this._renderItem}
        />
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
  
  _renderItem = (rowData) => {
    return (
      <TouchableOpacity style={styles.gridItem}>
        <Image source={rowData.image} style={styles.gridImage}/>
        <Text style={styles.gridTitle}>{rowData.title}</Text>
      </TouchableOpacity>
    )
  }
}