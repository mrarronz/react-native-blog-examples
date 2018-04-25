import React from 'react';
import {View, Text, TabBarIOS, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class TabBarIOSScreen extends React.Component {
  
  static navigationOptions = {
    headerTitle:'Usage with TabBarIOS'
  };
  
  constructor(props) {
    super(props);
    this.state = {
      selectedTabIndex: 0,
    };
  }
  
  render() {
    return (
      <TabBarIOS
        tintColor={'#ff0098'}
        barTintColor={'#FFF0D7'}
      >
        <Icon.TabBarItemIOS
          title={'Home'}
          iconName={'ios-home-outline'}
          selectedIconName={'ios-home'}
          iconColor={'#888'}
          selectedIconColor={'#ff0098'}
          selected={this.state.selectedTabIndex === 0}
          renderAsOriginal
          onPress={() => {
            this.setState({
              selectedTabIndex: 0
            })
          }}
        >
          {this.renderContent(0)}
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title={'HotSpot'}
          iconName={'ios-flame-outline'}
          selectedIconName={'ios-flame'}
          iconColor={'#888'}
          selectedIconColor={'#ff0098'}
          selected={this.state.selectedTabIndex === 1}
          renderAsOriginal
          onPress={() => {
            this.setState({
              selectedTabIndex: 1
            })
          }}
        >
          {this.renderContent(1)}
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title={'Discovery'}
          iconName={'ios-paper-plane-outline'}
          selectedIconName={'ios-paper-plane'}
          iconColor={'#888'}
          selectedIconColor={'#ff0098'}
          selected={this.state.selectedTabIndex === 2}
          renderAsOriginal
          onPress={() => {
            this.setState({
              selectedTabIndex: 2
            })
          }}
        >
          {this.renderContent(2)}
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title={'Profile'}
          iconName={'ios-person-outline'}
          selectedIconName={'ios-person'}
          iconColor={'#888'}
          selectedIconColor={'#ff0098'}
          selected={this.state.selectedTabIndex === 3}
          renderAsOriginal
          onPress={() => {
            this.setState({
              selectedTabIndex: 3
            })
          }}
        >
          {this.renderContent(3)}
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    )
  }
  
  renderContent(index) {
    return (
      <View style={styles.container}>
        <Text>This is page {index+1}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f0f0f0',
    alignItems:'center',
    justifyContent:'center'
  }
});