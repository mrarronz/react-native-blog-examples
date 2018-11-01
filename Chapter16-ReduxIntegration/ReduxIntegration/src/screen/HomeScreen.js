import  React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default class HomeScreen extends React.PureComponent {
  
  componentDidMount() {
    console.log('Home mounted');
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>HomeScreen</Text>
        <TouchableOpacity onPress={() => {this.props.navigation.navigate('Detail')}}>
          <Text>点击跳转到详情页</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});