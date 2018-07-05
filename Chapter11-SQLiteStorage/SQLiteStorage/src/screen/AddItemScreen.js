import React from 'react';
import {
  View,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard
} from 'react-native';
import {Toast} from 'teaset';

export default class AddItemScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      nickname: null,
      schoolName: null,
      className: null
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={{flex: 1, width:screenWidth }} behavior={'padding'}>
          <TextInput
            style={styles.textField}
            placeholder={'Please enter student name'}
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
            placeholder={'Please enter school name'}
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
            onChangeText={(text) => {
              this.setState({schoolName: text.replace(/\s/g, '')}); // 替换输入的空格
            }}
            value={this.state.schoolName}
          />
          <TextInput
            ref={(ref) => this.classTextField = ref}
            style={styles.textField}
            placeholder={'Please enter class name'}
            returnKeyType={'done'}
            returnKeyLabel={'done'}
            clearButtonMode={'while-editing'}
            keyboardType={'default'}
            maxLength={20}
            autoCorrect={false}
            underlineColorAndroid={'transparent'}
            onSubmitEditing={() => {Keyboard.dismiss()}}
            onChangeText={(text) => {
              this.setState({className: text.replace(/\s/g, '')}); // 替换输入的空格
            }}
            value={this.state.className}
          />
          <TouchableOpacity activeOpacity={0.7} style={styles.submitButton} onPress={() => this.onClickSubmitButton()}>
            <Text style={styles.submitText}>确定</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    )
  }
  
  onClickSubmitButton() {
    Keyboard.dismiss();
    if (this.state.nickname == null || this.state.nickname === "") {
      Toast.message('Please enter student name!');
      return;
    }
    if (this.state.schoolName == null || this.state.schoolName === "") {
      Toast.message('Please enter school name!');
      return;
    }
    if (this.state.className == null || this.state.className === "") {
      Toast.message('Please enter class name!');
      return;
    }
  }
}

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#eeeeee'
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