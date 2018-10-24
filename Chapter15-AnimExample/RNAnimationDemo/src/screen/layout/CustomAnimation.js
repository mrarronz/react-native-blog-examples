import React from 'react';
import {View, LayoutAnimation, TouchableOpacity, Text, StyleSheet, UIManager} from 'react-native';

export default class CustomAnimation extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      animItems: [
        {color: '#92c029'},
        {color: '#ffec0b'},
        {color: '#f54665'},
        {color: '#8e5dff'},
        {color: '#4ca5ff'},
        {color: '#c06c95'},
        {color: '#0da3cd'},
        {color: '#ffd413'},
        {color: '#1979ff'},
      ],
      size: 0,
      expand: true,
    };
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentView}>
          {
            this.state.animItems.map((item, index) => {
              return (
                <View key={index} style={[
                  styles.itemBox,
                  {
                    backgroundColor: item.color,
                    width: this.state.size,
                    height: this.state.size,
                    borderRadius: this.state.size/2
                  }
                ]}/>
              )
            })
          }
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() =>this.linearAnimation() }>
            <Text style={styles.buttonText}>linear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() =>this.easeInEaseOutAnimation() }>
            <Text style={styles.buttonText}>easeInEaseOut</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() =>this.springAnimation() }>
            <Text style={styles.buttonText}>spring</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  
  linearAnimation() {
    LayoutAnimation.configureNext({
      duration: 800,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.scaleXY,
      }
    });
    this.setState({
      size: this.state.expand ? 100: 0,
      expand: !this.state.expand
    });
  }
  
  easeInEaseOutAnimation() {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(1000, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.scaleXY)
    );
    this.setState({
      size: this.state.expand ? 100: 0,
      expand: !this.state.expand
    });
  }
  
  springAnimation() {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.spring
    );
    this.setState({
      size: this.state.expand ? 100: 0,
      expand: !this.state.expand
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  contentView: {
    flexDirection:'row',
    flexWrap:'wrap'
  },
  itemBox: {
    marginTop: 10,
    marginRight: 10,
  },
  buttonView: {
    alignItems:'center',
    justifyContent:'center',
    marginTop: 20
  },
  button: {
    width:150,
    height:40,
    borderRadius:6,
    backgroundColor:'#41a2ff',
    alignItems:'center',
    justifyContent:'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  }
});