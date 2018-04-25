import React from 'react';
import {View, ToolbarAndroid, StyleSheet} from 'react-native';
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
      <View style={styles.container}>
        <ToolbarAndroid
          style={styles.toolbar_system}
          logo={this.state.appLogo}
          title={'This is an android toolbar'}
        />
        <Icon.ToolbarAndroid
          navIconName={'amazon'}
          style={styles.toolbar_iconfont}
          titleColor="white"
          title={'This is an Icon toolbar'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f0f0f0'
  },
  toolbar_system: {
    height: 60,
    backgroundColor:'#7DF0E5'
  },
  toolbar_iconfont: {
    height: 60,
    backgroundColor:'#a9a9a9'
  }
});