import React from 'react';
import {View, Animated, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class MenuButtonAnimation extends React.Component {
  
  constructor() {
    super();
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
      ],
      animValue1: new Animated.Value(-400),
      animValue2: new Animated.Value(-400),
      animValue3: new Animated.Value(-400),
      animValue4: new Animated.Value(-400),
      animValue5: new Animated.Value(-400),
      animValue6: new Animated.Value(-400),
      animValue7: new Animated.Value(-400),
      animValue8: new Animated.Value(-400),
    };
  }
  
  componentDidMount() {
    Animated.stagger(100, [
  
      Animated.spring(this.state.animValue1, {
        toValue: bottomHeight,
      }),
      Animated.spring(this.state.animValue2, {
        toValue: bottomHeight,
      }),
      Animated.spring(this.state.animValue3, {
        toValue: bottomHeight,
      }),
      Animated.spring(this.state.animValue4, {
        toValue: bottomHeight,
      }),
      Animated.spring(this.state.animValue5, {
        toValue: closeViewHeight,
      }),
      Animated.spring(this.state.animValue6, {
        toValue: closeViewHeight,
      }),
      Animated.spring(this.state.animValue7, {
        toValue: closeViewHeight,
      }),
      Animated.spring(this.state.animValue8, {
        toValue: closeViewHeight,
      })
    ]).start();
  }
  
  render() {
    return (
      <View style={styles.container}>
        {
          this.state.animItems.map((item, index) => {
            let leftDistance = itemSpacing;
            let stateValue = this.getAnimationValue(index);
            if (index >= column) {
              let i = index % column;
              leftDistance = (itemSpacing + itemSize)*i + itemSpacing;
            } else {
              leftDistance = (itemSpacing + itemSize)*index + itemSpacing;
            }
            return (
              <Animated.View key={index} style={[
                styles.itemButton,
                {position:'absolute', left: leftDistance, bottom:stateValue, backgroundColor:item.color}
                ]}
              />
            )
          })
        }
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.closeButton} activeOpacity={0.7} onPress={() => this.onClickCloseButton()}>
            <Icon name={'close'} size={24} color={'#999'}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  
  getAnimationValue(index) {
    switch (index) {
      case 0:
        return this.state.animValue1;
      case 1:
        return this.state.animValue2;
      case 2:
        return this.state.animValue3;
      case 3:
        return this.state.animValue4;
      case 4:
        return this.state.animValue5;
      case 5:
        return this.state.animValue6;
      case 6:
        return this.state.animValue7;
      case 7:
        return this.state.animValue8;
    }
    return this.state.animValue1;
  }
  
  onClickCloseButton() {
    Animated.stagger(60, [
    
      Animated.spring(this.state.animValue8, {
        toValue: -400,
      }),
      Animated.spring(this.state.animValue7, {
        toValue: -400,
      }),
      Animated.spring(this.state.animValue6, {
        toValue: -400,
      }),
      Animated.spring(this.state.animValue5, {
        toValue: -400,
      }),
      Animated.spring(this.state.animValue4, {
        toValue: -400,
      }),
      Animated.spring(this.state.animValue3, {
        toValue: -400,
      }),
      Animated.spring(this.state.animValue2, {
        toValue: -400,
      }),
      Animated.spring(this.state.animValue1, {
        toValue: -400,
      })
    ]).start();
  }
}

const itemSize = 70; // 图标大小
const column = 4; // 图标列数
const screenWidth = Dimensions.get('window').width;
const itemSpacing = (screenWidth - itemSize * column)/5; // 每个图标之间水平间隔
const verticalPadding = 20; // 垂直间隔
const closeViewHeight = 100; // 底部关闭按钮所在空间高度
const bottomHeight = closeViewHeight + itemSize + verticalPadding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemButton: {
    width: itemSize,
    height: itemSize,
    borderRadius: 6,
  },
  buttonView: {
    position:'absolute',
    width: screenWidth,
    left: 0,
    bottom:0,
    height: closeViewHeight,
    alignItems:'center',
    justifyContent:'center'
  },
  closeButton: {
    width: 44,
    height: 44,
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
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  }
});