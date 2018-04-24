import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class TabItemPage extends React.Component {
  
  render() {
    let routeName = this.props.navigation.state.routeName;
    let displayText = '';
    let iconName = 'ios-sad';
    switch (routeName) {
      case 'First':
        displayText = 'No Featured content';
        break;
      case 'Second':
        displayText = 'No Categories available';
        iconName = 'ios-alert';
        break;
      case 'Third':
        displayText = 'No Top Charts Data';
        iconName = 'md-snow';
        break;
      case 'Fourth':
        displayText = 'Network is unavailable, \n please try again later';
        iconName = 'ios-wifi-outline';
        break;
      case 'Fifth':
        displayText = 'All apps are up to date';
        iconName = 'md-happy';
        break;
    }
    return (
      <View style={styles.container}>
        <Icon name={iconName} size={100} color={'#999999'}/>
        <Text style={styles.text}>{displayText}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f0f0f0',
    alignItems:'center',
    justifyContent:'center'
  },
  text : {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    color: '#999999',
    fontSize: 18
  }
});