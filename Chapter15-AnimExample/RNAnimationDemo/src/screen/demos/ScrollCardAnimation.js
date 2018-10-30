import React from 'react';
import {View, ScrollView, Animated, Dimensions, StyleSheet} from 'react-native';

export default class ScrollCardAnimation extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      scale1: new Animated.Value(0),
      scale2: new Animated.Value(0),
      scale3: new Animated.Value(0),
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={100}
          onScroll={(e) => this.onScrollEvent(e)}
        >
          <View style={styles.itemView}>
            <Animated.View style={[styles.boxView, {
              transform: [
                {scale: this.state.scale1.interpolate({
                    inputRange:[0, 1],
                    outputRange: [0.8, 1]
                  })}
              ]
            }]} />
          </View>
          <View style={styles.itemView}>
            <Animated.View style={[styles.boxView, {
              transform: [
                {scale: this.state.scale2.interpolate({
                    inputRange:[0, 1],
                    outputRange: [0.8, 1]
                  })}
              ]
            }]} />
          </View>
          <View style={styles.itemView}>
            <Animated.View style={[styles.boxView, {
              transform: [
                {scale: this.state.scale3.interpolate({
                    inputRange:[0, 1],
                    outputRange: [0.8, 1]
                  })}
              ]
            }]} />
          </View>
        </ScrollView>
      </View>
    )
  }
  
  onScrollEvent(e) {
    let offsetX = e.nativeEvent.contentOffset.x;
    let pageIndex = Math.floor((offsetX - screenWidth/2)/screenWidth) + 1;
    console.log('page: ' + pageIndex);
    if (pageIndex === 0) {
      Animated.parallel([
        Animated.spring(this.state.scale1, {
          toValue: 1,
        }),
        Animated.spring(this.state.scale2, {
          toValue: 0,
        }),
        Animated.spring(this.state.scale3, {
          toValue: 0,
        })
      ]).start();
    }
    else if (pageIndex === 1) {
      Animated.parallel([
        Animated.spring(this.state.scale1, {
          toValue: 0,
        }),
        Animated.spring(this.state.scale2, {
          toValue: 1,
        }),
        Animated.spring(this.state.scale3, {
          toValue: 0,
        })
      ]).start();
    }
    else if (pageIndex === 2) {
      Animated.parallel([
        Animated.spring(this.state.scale1, {
          toValue: 0,
        }),
        Animated.spring(this.state.scale2, {
          toValue: 0,
        }),
        Animated.spring(this.state.scale3, {
          toValue: 1,
        })
      ]).start();
    }
  }
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f0f0f0'
  },
  itemView: {
    width: screenWidth,
    height: screenHeight,
    alignItems:'center',
    justifyContent:'center'
  },
  boxView: {
    width: 300,
    height: 200,
    borderRadius: 10,
    backgroundColor:'#5fc6ff'
  }
});