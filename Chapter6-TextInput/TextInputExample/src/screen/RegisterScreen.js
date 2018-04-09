import React, {Component} from 'react';
import {
  TextInput,
  TouchableOpacity,
  Keyboard,
  Text,
  KeyboardAvoidingView,
  Dimensions,
  StyleSheet
} from 'react-native';

export default class RegisterScreen extends Component {
  
  static navigationOptions = {
    headerTitle: 'RegisterExample'
  };
  
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
        <KeyboardAvoidingView style={{flex: 1, width:screenWidth }} behavior={'padding'}>
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
              let str = text.replace(/[^0123456789]/, ''); // 只允许输入数字
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
              this.setState({password: text.replace(/\s/g, '')}); // 替换输入的空格
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
              this.setState({nickname: text.replace(/\s/g, '')}); // 替换输入的空格
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
          <TouchableOpacity activeOpacity={0.7} style={styles.submitButton}>
            <Text style={styles.submitText}>确定</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    )
  }
}

const screenWidth = Dimensions.get('window').width;
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
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  submitButton: {
    backgroundColor:'#707aa2',
    height: 50,
    borderRadius: 5,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    alignItems:'center',
    justifyContent:'center'
  },
  submitText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  }
});