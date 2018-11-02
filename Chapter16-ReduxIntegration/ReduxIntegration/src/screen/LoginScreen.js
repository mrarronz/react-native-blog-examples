import  React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import * as loginAction from '../actions/LoginAction';
import {NavigationActions, StackActions} from 'react-navigation';

const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Main'})
  ]
});

class LoginScreen extends React.Component {
  
  static navigationOptions = {
    headerTitle:'登录'
  };
  
  componentDidMount() {
    console.log(this.props);
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isSuccess) {
      this.props.navigation.dispatch(resetAction);
      return false;
    }
    return true;
  }
  
  render() {
    const { login } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.loginButton} activeOpacity={0.7} onPress={() =>login() }>
          <Text style={styles.buttonText}>登录</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  loginButton: {
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

export default connect(
  (state) => ({
    errorMessage:state.loginIn.errorMessage,
    isSuccess: state.loginIn.isSuccess,
    user: state.loginIn.user,
    loading: state.loginIn.loading
  }),
  (dispatch) => ({
    login: () =>dispatch(loginAction.login())
  })
)(LoginScreen)