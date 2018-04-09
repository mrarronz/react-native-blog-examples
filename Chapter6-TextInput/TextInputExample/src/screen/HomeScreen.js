import React from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';

export default class HomeScreen extends React.Component {
  
  static navigationOptions = {
    headerTitle: 'TextInputExample'
  };
  
  render() {
    return (
      <View style={styles.container}>
        {
          itemList.map((item, index) => {
            return (
              <TouchableHighlight key={index} underlayColor={'#dcdcdc'} onPress={() => {this.itemSelected(index)}}>
                <View style={styles.itemContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.detail}>{item.description}</Text>
                </View>
              </TouchableHighlight>
            )
          })
        }
      </View>
    )
  }
  
  itemSelected(index) {
    switch (index) {
      case 0:
        this.props.navigation.navigate('Register');
        break;
      case 1:
        this.props.navigation.navigate('inputAccessory');
        break;
    }
  }
}

const itemList = [
  {
    title: 'RegisterExample',
    description: 'Example shows how to use TextInput, handle return key on keyboard, simple validation on input text'
  },
  {
    title: 'InputAccessoryView',
    description: 'Example shows how to use InputAccessoryView on iOS'
  }
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc'
  },
  title: {
    fontSize: 16,
    fontWeight:'bold',
    color: '#000'
  },
  detail: {
    fontSize: 14,
    color: '#666666',
    marginTop: 10
  }
});