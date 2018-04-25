import React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HomeScreen extends React.Component {
  
  static navigationOptions = {
    headerTitle:'😁Icon font✌️'
  };
  
  render() {
    return (
      <FlatList
        style={styles.container}
        data={items}
        keyExtractor={(item) => item.title}
        renderItem={this._renderItem}
      />
    )
  }
  
  _renderItem = (item) => {
    let itemObj = item.item;
    return (
      <TouchableOpacity style={styles.cellItem} onPress={() => this.itemPressed(item.index)}>
        <View style={styles.infoView}>
          <Text style={styles.infoTitle}>{itemObj.title}</Text>
          <Text style={styles.infoDetail}>{itemObj.detail}</Text>
        </View>
        <Icon name={'angle-right'} size={28} color={'#ccc'}/>
      </TouchableOpacity>
    )
  };
  
  itemPressed(index) {
    switch (index) {
      case 0:
        this.props.navigation.navigate('Tab');
        break;
      case 1:
        this.props.navigation.navigate('Setting');
        break;
      case 2:
        this.props.navigation.navigate('iconBasic');
        break;
      case 3:
        
        break;
      case 4:
        this.props.navigation.navigate('other');
        break;
    }
  }
}

const items = [
  {title: 'App Store', detail: 'Display icons in TabBar, NavigationBar and empty page'},
  {title: 'Setting', detail: 'Display icons in Setting page'},
  {title: 'Iconfont basic usage', detail: 'Display icons which downloaded from http://www.iconfont.cn'},
  {title: 'Iconfont advanced usage',
    detail: 'Display custom font icons from http://www.iconfont.cn with react-native-vector-icons'},
  {title: 'Other usage', detail: 'Show other usage of react-native-vector-icons'}
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  cellItem: {
    flexDirection:'row',
    alignItems:'center',
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
    padding: 10,
  },
  infoView: {
    flex: 1,
    marginRight: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight:'bold',
  },
  infoDetail: {
    fontSize: 13,
    color: '#666',
    marginTop: 10
  }
});