import React from 'react';
import {View, ToolbarAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ToolbarAndroidScreen extends React.Component {
  
  static navigationOptions = {
    headerTitle:'Usage with ToolbarAndroid'
  };
  
  constructor(props) {
    super(props);
    this.state = {
      appLogo: null,
    };
  }
  
  componentWillMount() {
    Icon.getImageSource('android', 36, '#92c029').then((source) => {
      this.setState({
        appLogo: source
      })
    });
  }
  
  render() {
    return (
      <View style={{flex: 1, backgroundColor:'#f0f0f0'}}>
        <ToolbarAndroid
          style={{height: 60, backgroundColor:'#7DF0E5'}}
          logo={this.state.appLogo}
          title={'This is an android toolbar'}
        />
      </View>
    )
  }
}