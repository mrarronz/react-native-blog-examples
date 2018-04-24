import React from 'react';
import {View, Text, SectionList, PixelRatio, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class SettingScreen extends React.Component {
  
  static navigationOptions = {
    headerTitle: 'Setting'
  };
  
  render() {
    return (
      <SectionList
        style={styles.container}
        sections={settingItems}
        keyExtractor={(item) => item.iconName}
        renderItem={this._renderItem}
        // SectionSeparatorComponent={this._sectionSeparator}
        renderSectionHeader={this._sectionSeparator}
      />
    )
  }
  
  _renderItem = (item) => {
    let itemObj = item.item;
    return (
      <TouchableOpacity style={styles.itemCell}>
        <FontAwesomeIcon name={itemObj.iconName} size={24} color={itemObj.color}/>
        <Text style={styles.title}>{itemObj.title}</Text>
        <FontAwesomeIcon name={'angle-right'} size={24} color={'#999'}/>
      </TouchableOpacity>
    )
  };
  
  _sectionSeparator = (item) => {
    return (
      <View style={styles.separator}/>
    )
  };
}

const settingItems = [
  {
    data: [
      {iconName:'star', title:'Favorite', color:'#ff0088'},
      {iconName:'comment', title:'Comment', color:'#5588ff'},
      {iconName:'history', title:'History', color:'#67bb99'},
    ],
    id: 1
  },
  {
    data: [
      {iconName:'briefcase', title:'Money', color:'#ca8'},
      {iconName:'credit-card', title:'My Card', color:'#ff7555'},
      {iconName:'shopping-cart', title:'Shopping Cart', color:'#ee99aa'},
      {iconName:'download', title:'Download', color:'#eee500'},
    ]
  },
  {
    data: [
      {iconName:'qrcode', title:'QR Code', color:'#345333'},
      {iconName:'share-alt', title:'Share', color:'#ff5580'},
      {iconName:'info-circle', title:'About', color:'#aaaaaa'}
    ]
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f0f0f0'
  },
  itemCell: {
    flexDirection:'row',
    alignItems:'center',
    height: 44,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor:'white',
    borderBottomWidth: 1/PixelRatio.get(),
    borderBottomColor:'#dcdcdc'
  },
  title: {
    flex: 1,
    marginLeft:10,
    marginRight:10
  },
  separator: {
    height: 20,
  }
});