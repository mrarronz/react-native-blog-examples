import React from 'react';
import {View, Text} from 'react-native';

export default class ModalPage extends React.Component {
  
  static navigatorButtons = {
    leftButtons: [
      {
        title: 'back',
        id: 'backButton'
      }
    ]
  };
  
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  
  render() {
    return (
      <View style={{flex: 1, backgroundColor:'white'}}>
        <Text>弹窗页</Text>
      </View>
    )
  }
  
  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'backButton') {
        this.props.navigator.dismissModal({});
      }
    }
  }
}