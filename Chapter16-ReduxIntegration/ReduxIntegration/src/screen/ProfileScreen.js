import  React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationActions, StackActions} from "react-navigation";

export default class ProfileScreen extends React.PureComponent {
  
  componentDidMount() {
    console.log('Profile mounted');
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7} onPress={this.logoutAction}>
          <Text style={styles.buttonText}>退出</Text>
        </TouchableOpacity>
      </View>
    )
  }
  
  logoutAction = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Login'})
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  logoutButton: {
    width: 150,
    height: 40,
    borderRadius: 4,
    backgroundColor:'#4ca5ff',
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText: {
    fontSize: 17,
    fontWeight:'bold',
    color:'white'
  }
});