import  React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class ProfileScreen extends React.PureComponent {
  
  componentDidMount() {
    console.log('Profile mounted');
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>ProfileScreen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});