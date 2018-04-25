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
      leftIcon: null,
      rightIcon: null
    };
  }
  
  componentWillMount() {
    StatusBar.setBarStyle('default');
    Icon.getImageSource('ios-arrow-back', 30).then((source) => {
      this.setState({
        leftIcon: source
      })
    });
    Icon.getImageSource('ios-settings', 30).then((source) => {
      this.setState({
        rightIcon: source
      })
    });
  }
  
  componentWillUnmount() {
    StatusBar.setBarStyle('light-content');
  }
  
  render() {
    if (!this.state.rightIcon || !this.state.leftIcon) {
      return false;
    }
    return (
      <NavigatorIOS
        barTintColor={'#ffe30d'}
        tintColor={'#333'}
        style={{flex: 1}}
        initialRoute={{
          component: NavigatorPage,
          title: 'Usage with NavigatorIOS',
          leftButtonIcon: this.state.leftIcon,
          rightButtonIcon: this.state.rightIcon,
          onLeftButtonPress: () => {
            this.props.navigation.goBack();
          }
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