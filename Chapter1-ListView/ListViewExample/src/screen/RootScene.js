import React, { Component } from 'react';
import {View, ListView, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import SimpleListScreen from "./SimpleListScreen";
import GridLayoutScreen from "./GridLayoutScreen";
import SectionListScreen from "./SectionListScreen";
import GroupListScreen from "./GroupListScreen";

const items = [
  {
    title:'Simple List',
    detail: '单行列表，无分组'
  },
  {
    title:'Grid Layout',
    detail: '网格列表'
  },
  {
    title:'Section List 1',
    detail: '分组列表，嵌套View实现网格'
  },
  {
    title:'Section List 2',
    detail: '分组列表，嵌套ListView实现网格'
  },
];

export default class RootScene extends Component {
  
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows(items)
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
  
  _renderRow = (rowData, sectionId, rowId) => {
    let rowIndex = Number(rowId);
    return (
      <TouchableOpacity style={styles.cellContainer} onPress={() => {
        this.itemPressed(rowIndex);
      }}>
        <Text style={styles.titleLabel}>{rowData.title}</Text>
        <Text style={styles.detailLabel}>{rowData.detail}</Text>
      </TouchableOpacity>
    )
  };
  
  itemPressed(index: Number) {
    switch (index) {
      case 0:
        this.props.navigator.push(
          {
            component: SimpleListScreen,
            title: 'Simple List',
            leftButtonTitle: 'Back',
            onLeftButtonPress: () => {
              this.props.navigator.pop();
            }
          }
        );
        break;
      case 1:
        this.props.navigator.push(
          {
            component: GridLayoutScreen,
            title: 'Grid Layout',
            leftButtonTitle: 'Back',
            onLeftButtonPress: () => {
              this.props.navigator.pop();
            }
          }
        );
        break;
      case 2:
        this.props.navigator.push(
          {
            component: SectionListScreen,
            title: 'Section List 1',
            leftButtonTitle: 'Back',
            onLeftButtonPress: () => {
              this.props.navigator.pop();
            }
          }
        );
        break;
      case 3:
        this.props.navigator.push(
          {
            component: GroupListScreen,
            title: 'Section List 2',
            leftButtonTitle: 'Back',
            onLeftButtonPress: () => {
              this.props.navigator.pop();
            }
          }
        );
        break;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cellContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#dcdcdc'
  },
  titleLabel: {
    fontSize: 18,
    fontWeight:'bold',
  },
  detailLabel: {
    fontSize: 13,
    color: '#999999',
    marginTop: 10,
  },
  
});