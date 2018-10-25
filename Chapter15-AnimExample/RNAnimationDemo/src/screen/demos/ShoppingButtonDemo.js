import React from 'react';
import {View, FlatList, Text, Animated, TouchableOpacity, StyleSheet, PixelRatio, Dimensions} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class ShoppingButtonDemo extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      itemList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      itemCount: 0,
      bottomOffset: new Animated.Value(-100),
      bounceValue: new Animated.Value(1.0),
      isDisplayed: false
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.itemList}
          renderItem={this._renderItem}
          keyExtractor={(index) => String(index)}
          onMomentumScrollBegin={() => this.onScrollStart()}
          onMomentumScrollEnd={() => this.onScrollEnd()}
        />
        <Animated.View style={[styles.shoppingCart, {bottom: this.state.bottomOffset, transform:[{scale: this.state.bounceValue}]}]}>
          <TouchableOpacity style={styles.shoppingButton} activeOpacity={1.0} onPress={() => this.onTapShoppingCartAction()}>
            <View style={styles.numView}>
              <Text style={styles.itemCount}>{this.state.itemCount}</Text>
            </View>
            <FontAwesomeIcon name={'shopping-cart'} size={24} color={'#ff449f'}/>
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }
  
  _renderItem = () => {
    return (
      <TouchableOpacity style={styles.cellContainer} activeOpacity={0.7} onPress={() => this.onClickCellItem()}>
        <View style={styles.leftView}>
          <Text style={styles.title}>新鲜好吃的大苹果啊啦啦啦啦啦啦啦</Text>
          <Text style={styles.price}>￥5.00</Text>
        </View>
        <TouchableOpacity style={styles.addCartButton} activeOpacity={0.7} onPress={() => this.onClickAddShoppingCart()}>
          <Text style={styles.addCartText}>加入购物车</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    )
  };
  
  onClickCellItem() {
  
  };
  
  onClickAddShoppingCart() {
    this.setState(
      {
        itemCount: ++this.state.itemCount
      },
      () => {
        if (this.state.isDisplayed) {
          this.scaleAnimation();
        } else {
          Animated.timing(this.state.bottomOffset, {
            toValue: 20,
            duration: 100
          }).start();
          this.setState({
            isDisplayed: true
          })
        }
      }
    )
  }
  
  onTapShoppingCartAction() {
  
  }
  
  onScrollStart() {
    if (this.state.itemCount === 0) {
      return;
    }
    this.setState(
      {
        isDisplayed: false
      },
      () => {
        Animated.timing(this.state.bottomOffset, {
          toValue: -100,
          duration: 100
        }).start();
      }
    )
  }
  
  onScrollEnd() {
    if (this.state.itemCount === 0) {
      return;
    }
    this.setState(
      {
        isDisplayed: true,
      },
      () => {
        Animated.timing(this.state.bottomOffset, {
          toValue: 20,
          duration: 100
        }).start();
      }
    )
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f0f0f0'
  },
  cellContainer: {
    backgroundColor:'white',
    flexDirection:'row',
    alignItems:'center',
    padding: 10,
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 1/PixelRatio.get()
  },
  leftView: {
    justifyContent:'space-between',
    marginRight: 10,
    flex: 1
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
    left: Dimensions.get('window').width/2 - 32,
    elevation: 6
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
});