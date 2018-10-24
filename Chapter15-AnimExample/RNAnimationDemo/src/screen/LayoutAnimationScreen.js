import React from 'react';
import {View, FlatList, Text, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from "./AnimatedUsageScreen";

const items = [
  "Common Animation",
  "Custom Animation"
];

export class LayoutAnimationScreen extends React.Component {
  
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={items}
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
          screen:'Common',
          title:'Common Animation',
          navigatorStyle:{
            tabBarHidden: true
          }
        });
        break;
      case 1:
        this.props.navigator.push({
          screen:'CustomAnim',
          title:'Custom Animation',
          navigatorStyle:{
            tabBarHidden: true
          }
        });
        break;
    }
  }
}