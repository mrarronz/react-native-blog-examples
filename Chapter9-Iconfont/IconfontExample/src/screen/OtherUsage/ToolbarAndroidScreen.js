import React from 'react';
import {View, ToolbarAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ToolbarAndroidScreen extends React.Component {
  
  static navigationOptions = {
    header: null
  };
  
  constructor(props) {
    super(props);
    this.state = {
      appLogo: null,
      settingIcon: null
    };
  }
  
  componentWillMount() {
    Icon.getImageSource('react', 36).then((source) => {
      this.setState({
        appLogo: source
      })
    });
    Icon.getImageSource('cog', 30).then((source) => {
      this.setState({
        settingIcon: source
      })
    })
  }
  
  render() {
    return (
      <View>
        <ToolbarAndroid
          navIcon={this.state.appLogo}
          title="Usage with ToolbarAndroid"
          actions={
            [
              {title: 'Settings', icon: this.state.settingIcon, show: 'always'}
            ]
          }
          onActionSelected={this.onActionSelected}
        />
      </View>
    )
  }
  
  onActionSelected = (position) => {
  
  };
}