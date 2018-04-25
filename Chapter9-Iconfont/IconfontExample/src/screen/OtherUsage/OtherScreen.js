import React from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity, Linking, PixelRatio, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class OtherScreen extends React.Component {
  
  static navigationOptions = {
    headerTitle:'Other usage'
  };
  
  constructor(props) {
    super(props);
    this.state = {
      userIcon: null
    };
    Icon.getImageSource('user', 50, '#999').then((source) => {
      this.setState({
        userIcon: source
      })
    })
  }
  
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.IconContainer}>
          <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
            Login with Facebook
          </Icon.Button>
        </View>
        <View style={styles.IconContainer}>
          <Icon.Button name="twitter" backgroundColor="#59ACEA" onPress={this.loginWithTwitter}>
            Follow me on twitter
          </Icon.Button>
        </View>
        <View style={styles.IconContainer}>
          <Icon.Button name="star" backgroundColor="#999999" onPress={this.starOnGithub}>
            Give me a star on Github😁
          </Icon.Button>
        </View>
        <View style={styles.listView}>
          {
            items.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.itemContainer}
                  activeOpacity={0.6}
                  onPress={() => this.onListItemPressed(index)}
                >
                  <Text style={styles.title}>{item}</Text>
                  {
                    (index === 0) ?
                      <Image source={this.state.userIcon} style={styles.avatar}/> : null
                  }
                  <Icon name={'angle-right'} size={24} color={'#ccc'}/>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </ScrollView>
    )
  }
  
  loginWithFacebook = () => {
  
  };
  
  loginWithTwitter = () => {
  
  };
  
  starOnGithub = () => {
    let url = "https://github.com/mrarronz/react-native-blog-examples";
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Open failed due to unsupported url.');
      }
    })
  };
  
  onListItemPressed(index) {
    switch (index) {
      case 1:
        // Show usage in TabBarIOS
        
        break;
      case 2:
        // Show usage in NavigatorIOS
        
        break;
      case 3:
        // Show usage in ToolbarAndroid
        
        break;
    }
  }
}

const items = [
  'Usage as PNG image or source object',
  'Usage with TabBarIOS',
  'Usage with NavigatorIOS',
  'Usage with ToolbarAndroid'
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f0f0f0',
    paddingTop:20,
    paddingBottom:20
  },
  IconContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  listView: {
    marginTop: 30
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1/PixelRatio.get(),
    borderBottomColor: '#dcdcdc'
  },
  title: {
    fontSize: 17,
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 5,
    resizeMode: 'contain',
    borderRadius: 25,
    borderWidth: 1/PixelRatio.get(),
    borderColor:'#dcdcdc',
    backgroundColor: '#D6ECF6'
  },
});