import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {AppStyles} from "../common/AppStyle";
import {NavigationActions} from "react-navigation";

export default class HomeScreen extends React.Component {
  
  static navigationOptions = {
    headerTitle:'首页'
  };
  
  render() {
    return (
      <View style={styles.container}>
        <Text>登录成功！！这是首页</Text>
        <TouchableOpacity style={AppStyles.buttonContainer} onPress={() =>this.logoutAction() }>
          <Text style={AppStyles.buttonTitleBig}>退出</Text>
        </TouchableOpacity>
      </View>
    )
  }
  
  logoutAction() {
    let resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'Login'})
      ],
      key: null
    });
    this.props.navigation.dispatch(resetAction);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    padding: 10
  },
  
});