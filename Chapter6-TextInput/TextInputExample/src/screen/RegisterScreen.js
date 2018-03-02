import React, {Component} from 'react';
import {View, TextInput, TouchableOpacity, Keyboard, Text, KeyboardAvoidingView, StyleSheet} from 'react-native';

export default class RegisterScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      nickname: '',
    }
  }
  
  render() {
    return (
      <TouchableOpacity activeOpacity={1} style={styles.container} onPress={() => {Keyboard.dismiss()}}>
        <KeyboardAvoidingView behavior={'position'}>
          <TextInput
            ref={(ref) => this.phoneTextField = ref}
            style={styles.textField}
            placeholder={'请输入手机号'}
            returnKeyType={'next'}
            returnKeyLabel={'next'}
            clearButtonMode={'while-editing'}
            keyboardType={'default'}
            maxLength={11}
            autoFocus={true}
            autoCorrect={false}
            underlineColorAndroid={'transparent'}
            onSubmitEditing={() => {
              this.pwdTextField.focus();
            }}
            onChangeText={(text) => {
              let str = text.replace(/[^0123456789]/, '');
              this.setState({
                phone: str
              })
            }}
            value={this.state.phone}
          />
          <TextInput
            ref={(ref) => this.pwdTextField = ref}
            style={styles.textField}
            placeholder={'请输入密码'}
            returnKeyType={'next'}
            returnKeyLabel={'next'}
            clearButtonMode={'while-editing'}
            keyboardType={'default'}
            maxLength={14}
            secureTextEntry={true}
            underlineColorAndroid={'transparent'}
            onSubmitEditing={() => {
              this.nickNameField.focus();
            }}
            onChangeText={(text) => {
              this.setState({password: text.replace(/\s/g, '')});
            }}
            value={this.state.password}
          />
          <TextInput
            ref={(ref) => this.nickNameField = ref}
            style={styles.textField}
            placeholder={'请输入昵称'}
            returnKeyType={'next'}
            returnKeyLabel={'next'}
            clearButtonMode={'while-editing'}
            keyboardType={'default'}
            maxLength={20}
            autoCorrect={false}
            underlineColorAndroid={'transparent'}
            onSubmitEditing={() => {
              this.schoolTextField.focus();
            }}
            onChangeText={(text) => {
              this.setState({nickname: text.replace(/\s/g, '')});
            }}
            value={this.state.nickname}
          />
          <TextInput
            ref={(ref) => this.schoolTextField = ref}
            style={styles.textField}
            placeholder={'请输入学校'}
            returnKeyType={'next'}
            returnKeyLabel={'next'}
            clearButtonMode={'while-editing'}
            keyboardType={'default'}
            maxLength={100}
            autoCorrect={false}
            underlineColorAndroid={'transparent'}
            onSubmitEditing={() => {
              this.classTextField.focus();
            }}
          />
          <TextInput
            ref={(ref) => this.classTextField = ref}
            style={styles.textField}
            placeholder={'请输入班级'}
            returnKeyType={'done'}
            returnKeyLabel={'done'}
            clearButtonMode={'while-editing'}
            keyboardType={'default'}
            maxLength={20}
            autoCorrect={false}
            underlineColorAndroid={'transparent'}
            onSubmitEditing={() => {Keyboard.dismiss()}}
          />
        </KeyboardAvoidingView>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems:'center',
    justifyContent:'center'
  },
  textField: {
    backgroundColor:'white',
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#dcdcdc',
    margin: 10,
    width: 200
  }
});