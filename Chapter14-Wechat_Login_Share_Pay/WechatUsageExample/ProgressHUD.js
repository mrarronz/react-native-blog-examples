import React, {Component} from 'react';
import {View, Text, Modal, ActivityIndicator, StyleSheet} from 'react-native';

export default class ProgressHUD extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      hasText: false,
      text: ""
    }
  }
  
  show(text) {
    let hasText = false;
    if (text !== undefined && text != null && text !== "") {
      hasText = true;
    }
    this.setState({
      isShow: true,
      text: text,
      hasText: hasText,
    });
  }
  
  hide() {
    this.setState({
      isShow: false,
    })
  }
  
  render() {
    return (
      <Modal transparent={true} visible={this.state.isShow} onRequestClose={() => {}}>
        <View style={hudStyles.container}>
          <View style={hudStyles.hud}>
            <ActivityIndicator size='large' color='white'/>
            {this.state.hasText ? <Text style={hudStyles.text}>{this.state.text}</Text> : null}
          </View>
        </View>
      </Modal>
    )
  }
}

const hudStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'transparent',
  },
  hud: {
    backgroundColor:'black',
    borderRadius:10,
    opacity: 0.8,
    padding:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color:'white',
    fontSize: 16,
    fontWeight:'bold',
    marginTop: 10,
  }
});