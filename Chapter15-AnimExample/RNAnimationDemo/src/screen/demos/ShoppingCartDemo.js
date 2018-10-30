import React, {Component} from 'react';
import {View, Animated, Easing, Text, TouchableOpacity, StyleSheet, Dimensions, findNodeHandle, UIManager} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ShoppingCartDemo extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      itemCount: 0,
      bounceValue: new Animated.Value(1.0),
      scaleValue: new Animated.Value(1),
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      rotateZ: new Animated.Value(0),
      isDisplayed: false,
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        
        <View style={styles.cellContainer}>
          <View style={styles.foodView} ref={(ref) => this.foodView = ref}>
            <Icon name={'food-apple'} size={80} color={'#F54665'}/>
          </View>
          <View style={styles.infoView}>
            <Text style={styles.title}>又大又好吃的苹果</Text>
            <Text style={styles.price}>￥5.00</Text>
          </View>
          <TouchableOpacity style={styles.addCartButton} activeOpacity={0.7} onPress={() => this.onClickAddShoppingCart()}>
            <Text style={styles.addCartText}>加入购物车</Text>
          </TouchableOpacity>
        </View>
        
        <Animated.View
          style={[styles.shoppingCart, {transform:[{scale: this.state.bounceValue}]}]}
          ref={(ref) => this.cartView = ref}
        >
          <TouchableOpacity style={styles.shoppingButton} activeOpacity={1.0} onPress={() => this.onTapShoppingCartAction()}>
            <View style={styles.numView}>
              <Text style={styles.itemCount}>{this.state.itemCount}</Text>
            </View>
            <FontAwesomeIcon name={'shopping-cart'} size={24} color={'#ff449f'}/>
          </TouchableOpacity>
        </Animated.View>
        
        {
          this.state.isDisplayed ?
            <Animated.View style={{
              position:'absolute',
              left: this.state.x,
              top: this.state.y,
              transform: [
                {
                  rotateZ: this.state.rotateZ.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg']
                  })
                },
                {scale: this.state.scaleValue}
              ]
            }}>
              <View style={styles.foodView}>
                <Icon name={'food-apple'} size={80} color={'#F54665'}/>
              </View>
            </Animated.View> : null
        }
      </View>
    )
  }
  
  onTapShoppingCartAction() {
  
  }
  
  onClickAddShoppingCart() {
    this.setState(
      {
        isDisplayed: true,
      },
      () => {
        // 注意，实际开发中应当用measure方法获取控件在屏幕中的位置灵活设置开始坐标和结束坐标，这里为了简单演示直接写死
        let startX = 10; // 图标的开始位置x
        let startY = 10; // 图标的开始位置y
        let endX = screenWidth/2 - 32; // 结束位置，即购物车按钮所在位置的横坐标x
        let endY = screenHeight-160;  // 结束位置的纵坐标，购物车按钮所在位置
  
        this.state.x.setValue(startX);
        this.state.y.setValue(startY);
        this.state.rotateZ.setValue(0);
        this.state.scaleValue.setValue(1);
  
        let duration = 1000;
        let endRotateZ = 720;
  
        Animated.parallel([
          Animated.timing(this.state.x, {
            toValue: endX,
            duration: duration,
            easing: Easing.linear
          }),
          Animated.timing(this.state.y, {
            toValue: endY,
            duration: duration,
            easing: Easing.cubic
          }),
          Animated.timing(this.state.rotateZ, {
            toValue: endRotateZ,
            duration: duration,
            easing: Easing.linear
          }),
          Animated.timing(this.state.scaleValue, {
            toValue: 0.3,
            duration: duration,
            easing: Easing.cubic
          }),
        ]).start(() => {
          this.setState(
            {
              isDisplayed: false,
              itemCount: ++this.state.itemCount
            }, () => {
              this.scaleAnimation();
            }
          )
        });
      }
    );
  }
  
  scaleAnimation() {
    Animated.sequence([
      Animated.timing(this.state.bounceValue, {
        toValue: 0.6,
        duration: 100
      }),
      Animated.spring(this.state.bounceValue, {
        toValue: 1.0,
        friction: 3,
        tension: 40
      }),
    ]).start();
  }
}

const itemSize = 80;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f0f0f0'
  },
  cellContainer: {
    backgroundColor:'white',
    padding: 10,
    flexDirection:'row',
    alignItems:'center'
  },
  foodView: {
    backgroundColor:'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor:'#dcdcdc',
    alignItems:'center',
    justifyContent:'center',
    width: itemSize,
    height: itemSize,
  },
  infoView: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    color: '#333',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'#f52328',
    marginTop: 20
  },
  shoppingCart: {
    backgroundColor:'white',
    width: 64,
    height: 64,
    borderRadius: 35,
    shadowRadius: 8,
    shadowColor: '#aaaaaa',
    shadowOpacity: 0.6,
    shadowOffset: {width: 0, height:3},
    zIndex: 100,
    position:'absolute',
    left: screenWidth/2 - 32,
    bottom: 20,
    elevation: 6,
  },
  shoppingButton: {
    width: 64,
    height: 64,
    alignItems:'center',
    justifyContent:'center',
  },
  numView: {
    backgroundColor:'#ff9800',
    height: 20,
    minWidth: 20,
    maxWidth: 38,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 10,
    alignItems:'center',
    justifyContent:'center',
    elevation: 4,
    shadowRadius: 4,
    shadowColor: '#aaaaaa',
    shadowOpacity: 0.6,
    shadowOffset: {width: 0, height:3},
  },
  itemCount: {
    fontSize: 13,
    color:'white',
    textAlign:'center',
  },
  addCartButton: {
    alignItems:'center',
    justifyContent:'center',
    width: 96,
    height: 32,
    borderRadius: 16,
    backgroundColor:'#FF9800',
    elevation: 4,
    shadowRadius: 4,
    shadowColor: '#aaaaaa',
    shadowOpacity: 0.6,
    shadowOffset: {width: 3, height:3},
  },
  addCartText: {
    fontSize: 14,
    color:'white'
  },
});