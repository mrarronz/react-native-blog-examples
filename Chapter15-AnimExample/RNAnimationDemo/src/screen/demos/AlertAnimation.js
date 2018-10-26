import React from 'react';
import {View, Animated, Easing, TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';

export default class AlertAnimation extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      scaleValue: new Animated.Value(0.6),
      yOffset: new Animated.Value(0),
      opacity: new Animated.Value(0),
      alertOpacity: new Animated.Value(1),
      isAlertShow: false,
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() =>this.buttonClicked() }>
          <Text style={styles.buttonText}>Show</Text>
        </TouchableOpacity>
        {
          this.state.isAlertShow ?
            <Animated.View style={[styles.alertWindow, {opacity: this.state.opacity}]}>
              <Animated.View style={[
                styles.alertView,
                {transform: [
                    {scale: this.state.scaleValue},
                    {translateY: this.state.yOffset.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-300, 200]
                      })}
                  ],
                  opacity: this.state.alertOpacity
                }
              ]}>
                <Text style={styles.alertTitle}>Hello这是标题</Text>
                <Text style={styles.alertContent}>这是消息内容啦啦啦啦啦啦啦啦啦啦绿绿绿绿绿绿绿绿绿绿绿绿绿绿啦啦啦啦啦啦啦啦啦啦绿绿绿绿绿绿绿绿绿绿绿绿绿绿</Text>
                <TouchableOpacity style={styles.alertButton} activeOpacity={0.7} onPress={() => this.onClickAlertButton()}>
                  <Text style={styles.buttonText}>OK</Text>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View> : null
        }
      </View>
    )
  }
  
  buttonClicked() {
    if (!this.state.isAlertShow) {
      this.state.scaleValue.setValue(0.6);
      this.state.yOffset.setValue(0);
      this.state.opacity.setValue(0);
      this.state.alertOpacity.setValue(1);
      Animated.parallel([
        Animated.sequence([
          Animated.timing(this.state.yOffset, {
            toValue: 1,
            timing: 250,
            easing: Easing.linear
          }),
          Animated.spring(this.state.scaleValue, {
            toValue: 1.0,
            friction: 3,
            tension: 40,
          }),
        ]),
        Animated.timing(
          this.state.opacity,
          {
            toValue: 1,
            duration: 500,
            easing: Easing.linear
          }
        )
      ]).start();
      this.setState({
        isAlertShow: true
      })
    }
  }
  
  onClickAlertButton() {
    if (this.state.isAlertShow) {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(this.state.scaleValue, {
            toValue: 0.6,
            duration:250,
          }),
          Animated.parallel([
            Animated.timing(this.state.scaleValue, {
              toValue: 3.0,
              duration: 250,
            }),
            Animated.timing(
              this.state.alertOpacity,
              {
                toValue: 0,
                duration: 500,
                easing: Easing.linear
              }
            )
          ])
        ]),
        Animated.timing(
          this.state.opacity,
          {
            toValue: 0,
            duration: 500,
            easing: Easing.linear
          }
        )
      ]).start();
      setTimeout(() => {
        this.setState({
          isAlertShow: false
        })
      }, 800)
    }
  }
}

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f0f0f0',
    alignItems:'center',
    justifyContent:'center'
  },
  button: {
    width:150,
    height:40,
    borderRadius:6,
    backgroundColor:'#41a2ff',
    alignItems:'center',
    justifyContent:'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  alertWindow: {
    position:'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertView: {
    backgroundColor: 'white',
    marginLeft: 20,
    marginRight: 20,
    minWidth: 280,
    minHeight: 200,
    borderRadius: 6,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#101010',
    textAlign: 'center',
    marginTop: 25,
    marginLeft: 40,
    marginRight: 40
  },
  alertContent: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 20,
    textAlign:'center',
    fontSize: 14,
    color: '#666666',
  },
  alertButton: {
    minWidth: 250,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#0da3cd',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 15,
    marginRight: 15,
    shadowRadius: 4,
    shadowColor: '#aaaaaa',
    shadowOpacity: 0.6,
    shadowOffset: {width: 0, height:3},
  }
});