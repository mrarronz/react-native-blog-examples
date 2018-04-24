import React from 'react';
import {View, Text, Image, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconX from 'react-native-vector-icons/Feather';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

export default class HomeScreen extends React.Component {
  
  static navigationOptions = {
    headerTitle:'Iconfont Example'
  };
  
  render() {
    return (
      <FlatList
        style={styles.container}
        data={items}
        keyExtractor={(item) => item.title}
        renderItem={this._renderItem}
      />
    )
  }
  
  _renderItem = () => {
    return (
      <TouchableOpacity style={styles.cellItem}>
        <Icon name={'align-center'} size={30} color={'#900'}/>
        <IconX name={'airplay'} size={30} color={'blue'}/>
        <EvilIcon name={'star'} size={30}/>
        
        <Icon.Button name={'facebook'} backgroundColor={'#3b5998'} onPress={() => {
          this.props.navigation.navigate('Tab')
        }}>
          <Text>Login with Facebook</Text>
        </Icon.Button>
      </TouchableOpacity>
    )
  };
}

const items = [
  {title: 'App Store', detail: 'Display icons in TabBar, NavigationBar and empty page'},
  {title: 'Setting', detail: 'Display icons in Setting page'}
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  cellItem: {
    flexDirection:'row',
    alignItems:'center',
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
    padding: 10,
  }
});