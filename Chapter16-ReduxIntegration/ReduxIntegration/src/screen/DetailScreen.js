import  React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class DetailScreen extends React.PureComponent {
  
  static navigationOptions = {
    headerTitle:'详情页'
  };
  
  render() {
    return (
      <View style={styles.container}>
        <Text>DetailScreen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});