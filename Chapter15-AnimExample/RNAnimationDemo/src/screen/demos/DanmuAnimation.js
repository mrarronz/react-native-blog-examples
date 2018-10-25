import React from 'react';
import {View, Animated, Easing, Text, Dimensions, StyleSheet} from 'react-native';

export default class DanmuAnimation extends React.Component {
  
  constructor(props){
    super(props);
    let data = [
      "哈哈哈哈哈哈",
      "干得漂亮",
      "加油加油加油加油加油加油加油加油",
      "Good job!!!",
      "66666666666666666",
      "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
      "hehehehehehehehehe",
      "这是一条有味道的弹幕",
      "啦啦啦啦啦啦啦",
      "动次打次动次打次",
      "。。。。。。。。。"
    ];
    let xValues = [];
    let animations = [];
    for (let i = 0; i < data.length; i++) {
      let leftValue = Math.floor(Math.random() * 100);
      xValues.push(new Animated.Value(-leftValue));
      animations.push(
        Animated.timing(xValues[i], {
          toValue: screenWidth,
          duration:4000,
          easing: Easing.linear
        })
      );
    }
    this.state = {
      dataList: data,
      xValueList: xValues,
      animList: animations,
    };
  }
  
  componentDidMount() {
    
    Animated.parallel(this.state.animList).start(() => this.loadMoreAnimation());
  }
  
  loadMoreAnimation() {
    let x = [];
    let a = [];
    for (let i = 0; i < this.state.dataList.length; i++) {
      let leftValue = Math.floor(Math.random() * 100);
      x.push(new Animated.Value(-leftValue));
      a.push(
        Animated.timing(x[i], {
          toValue: screenWidth,
          duration:4000,
          easing: Easing.linear
        })
      );
    }
    this.setState(
      {
        xValueList: x,
        animList: a,
      }
    );
    Animated.stagger(500, a).start();
  }
  
  render() {
    return (
      <View style={styles.container}>
        {
          this.state.dataList.map((item, index) => {
            return (
              <Animated.View key={index} style={[styles.textView, {
                transform: [
                  {translateX:this.state.xValueList[index]},
                  {translateY: Math.floor(Math.random() * 20)}
                ]
              }]}>
                <Text style={styles.text}>{item}</Text>
              </Animated.View>
            )
          })
        }
      </View>
    )
  }
}

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textView: {
    flexDirection:'row',
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20,
    paddingRight:20,
    backgroundColor:'rgba(0,0,0,0.5)',
    borderRadius:6,
    justifyContent:'center',
    alignItems:'center',
  },
  text: {
    fontSize:14,
    color:'white',
  }
});