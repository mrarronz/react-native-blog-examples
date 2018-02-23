import React, {Component} from 'react';
import {View, Alert, ListView, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {data} from "./SimpleListScreen";

export default class GridLayoutScreen extends Component {
  
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
      <View style={{ flex: 1}}>
        <ListView
          contentContainerStyle={styles.listView}
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
  listView: {
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  cellContainer: {
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor:'#dcdcdc',
    width:100,
    height: 100,
    marginTop: 20,
  },
  image: {
    width: 60,
    height: 60,
  },
  title: {
    marginTop: 10,
  }
});