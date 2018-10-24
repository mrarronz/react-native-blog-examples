import React from 'react';
import {View, Text, StyleSheet, Easing, TouchableOpacity, Animated, Dimensions} from 'react-native';

export default class GroupAnimation extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      wValue1: new Animated.Value(8),
      wValue2: new Animated.Value(8),
      wValue3: new Animated.Value(8),
      
      hValue1: new Animated.Value(5),
      hValue2: new Animated.Value(5),
      hValue3: new Animated.Value(5),
      hValue4: new Animated.Value(5),
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content1}>
          <Animated.View style={[styles.horizontalProgress, {marginTop: 15, width: this.state.wValue1}]}/>
          <Animated.View style={[styles.horizontalProgress, {width: this.state.wValue2}]}/>
          <Animated.View style={[styles.horizontalProgress, {width: this.state.wValue3}]}/>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() =>this.horizontalSequenceAnimation() }>
            <Text style={styles.buttonText}>Sequence</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() =>this.horizontalParallelAnimation()}>
            <Text style={styles.buttonText}>parallel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => this.horizontalStaggerAnimation()}>
            <Text style={styles.buttonText}>stagger</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content2}>
          <Animated.View style={[styles.verticalProgress, {height: this.state.hValue1}]}/>
          <Animated.View style={[styles.verticalProgress, {height: this.state.hValue2}]}/>
          <Animated.View style={[styles.verticalProgress, {height: this.state.hValue3}]}/>
          <Animated.View style={[styles.verticalProgress, {height: this.state.hValue4}]}/>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => this.verticalSequenceAnimation()}>
            <Text style={styles.buttonText}>Sequence</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => this.verticalParallelAnimation()}>
            <Text style={styles.buttonText}>parallel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => this.verticalStaggerAnimation()}>
            <Text style={styles.buttonText}>stagger</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  
  horizontalSequenceAnimation() {
    this.setState(
      {
        wValue1: new Animated.Value(8),
        wValue2: new Animated.Value(8),
        wValue3: new Animated.Value(8),
      },
      () => {
        Animated.sequence([
          Animated.timing(this.state.wValue1, {
            toValue: progressWidth,
            duration: 2000,
            easing: Easing.linear
          }),
          Animated.timing(this.state.wValue2, {
            toValue: 100,
            duration: 1500,
            easing: Easing.linear
          }),
          Animated.timing(this.state.wValue3, {
            toValue: 200,
            duration: 2500,
            easing: Easing.linear
          }),
        ]).start();
      }
    )
  }
  
  horizontalParallelAnimation() {
    this.setState(
      {
        wValue1: new Animated.Value(8),
        wValue2: new Animated.Value(8),
        wValue3: new Animated.Value(8),
      },
      () => {
        Animated.parallel([
          Animated.timing(this.state.wValue1, {
            toValue: progressWidth,
            duration: 2000,
            easing: Easing.linear
          }),
          Animated.timing(this.state.wValue2, {
            toValue: 100,
            duration: 1500,
            easing: Easing.linear
          }),
          Animated.timing(this.state.wValue3, {
            toValue: 200,
            duration: 2500,
            easing: Easing.linear
          }),
        ]).start();
      }
    )
  }
  
  horizontalStaggerAnimation() {
    this.setState(
      {
        wValue1: new Animated.Value(8),
        wValue2: new Animated.Value(8),
        wValue3: new Animated.Value(8),
      },
      () => {
        Animated.stagger(500, [
          Animated.timing(this.state.wValue1, {
            toValue: progressWidth,
            duration: 2000,
            easing: Easing.linear
          }),
          Animated.timing(this.state.wValue2, {
            toValue: 100,
            duration: 1500,
            easing: Easing.linear
          }),
          Animated.timing(this.state.wValue3, {
            toValue: 200,
            duration: 2500,
            easing: Easing.linear
          }),
        ]).start();
      }
    )
  }
  
  verticalSequenceAnimation() {
    this.setState(
      {
        hValue1: new Animated.Value(5),
        hValue2: new Animated.Value(5),
        hValue3: new Animated.Value(5),
        hValue4: new Animated.Value(5)
      },
      () => {
        Animated.sequence([
          Animated.timing(this.state.hValue1, {
            toValue: progressHeight,
            duration: 2000,
            easing: Easing.linear
          }),
          Animated.spring(this.state.hValue2, {
            toValue: 100,
            friction: 3,
            tension: 40,
          }),
          Animated.timing(this.state.hValue3, {
            toValue: 50,
            duration: 2500,
            easing: Easing.linear
          }),
          Animated.spring(this.state.hValue4, {
            toValue: 200,
            friction: 3,
            tension: 40,
          }),
        ]).start();
      }
    )
  }
  
  verticalParallelAnimation() {
    this.setState(
      {
        hValue1: new Animated.Value(5),
        hValue2: new Animated.Value(5),
        hValue3: new Animated.Value(5),
        hValue4: new Animated.Value(5)
      },
      () => {
        Animated.parallel([
          Animated.timing(this.state.hValue1, {
            toValue: progressHeight,
            duration: 2000,
            easing: Easing.linear
          }),
          Animated.timing(this.state.hValue2, {
            toValue: 100,
            duration: 2500,
            easing: Easing.linear
          }),
          Animated.timing(this.state.hValue3, {
            toValue: 50,
            duration: 2500,
            easing: Easing.linear
          }),
          Animated.timing(this.state.hValue4, {
            toValue: 200,
            duration: 2500,
            easing: Easing.linear
          }),
        ]).start();
      }
    )
  }
  
  verticalStaggerAnimation() {
    this.setState(
      {
        hValue1: new Animated.Value(5),
        hValue2: new Animated.Value(5),
        hValue3: new Animated.Value(5),
        hValue4: new Animated.Value(5)
      },
      () => {
        Animated.stagger(500, [
          Animated.spring(this.state.hValue1, {
            toValue: progressHeight,
            friction: 3,
            tension: 40,
          }),
          Animated.spring(this.state.hValue2, {
            toValue: 100,
            friction: 3,
            tension: 40,
          }),
          Animated.spring(this.state.hValue3, {
            toValue: 180,
            friction: 3,
            tension: 40,
          }),
          Animated.spring(this.state.hValue4, {
            toValue: 200,
            friction: 3,
            tension: 40,
          }),
        ]).start();
      }
    )
  }
}

const progressWidth = Dimensions.get('window').width - 40;
const progressHeight = 180;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content1: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc'
  },
  content2: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
    marginTop: 50,
    height: 200
  },
  buttonView: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    padding: 10,
    marginTop: 10,
  },
  button: {
    paddingLeft: 10,
    paddingRight: 10,
    height:40,
    borderRadius:6,
    backgroundColor:'#ffb131',
    alignItems:'center',
    justifyContent:'center',
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  horizontalProgress: {
    borderRadius: 4,
    height: 8,
    minWidth: 8,
    marginBottom: 20,
    backgroundColor: '#12cd63'
  },
  verticalProgress: {
    width: 30,
    minHeight: 0,
    backgroundColor:'#0da3cd'
  }
});