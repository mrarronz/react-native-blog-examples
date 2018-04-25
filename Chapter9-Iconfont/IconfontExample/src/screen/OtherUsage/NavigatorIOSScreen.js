import React from 'react';
import {View, NavigatorIOS, StatusBar, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class NavigatorIOSScreen extends React.Component {
  
  static navigationOptions = {
    header: null
  };
  
  constructor() {
    super();
    this.state = {
      rightIcon: null
    };
  }
  
  componentWillMount() {
    StatusBar.setBarStyle('default');
    Icon.getImageSource('ios-settings', 30, '#333').then((source) => {
      this.setState({
        rightIcon: source
      })
    });
  }
  
  componentWillUnmount() {
    StatusBar.setBarStyle('light-content');
  }
  
  render() {
    return (
      <NavigatorIOS
        barTintColor={'#ffe30d'}
        style={{flex: 1}}
        initialRoute={{
          component: NavigatorPage,
          title: 'Usage with NavigatorIOS',
          rightButtonIcon: this.state.rightIcon
        }}
      />
    )
  }
}

class NavigatorPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon name={'logo-apple'} size={100} color={'#999'}/>
        <Text style={{color: '#666'}}>Test icon in NavigatorIOS</Text>
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
  }
});