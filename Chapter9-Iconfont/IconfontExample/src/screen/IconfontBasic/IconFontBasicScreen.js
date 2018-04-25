import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';

export default class IconFontBasicScreen extends React.Component {
  
  static navigationOptions = {
    headerTitle:'Iconfont Basic'
  };
  
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.tip}>使用数组循环方法批量显示的时候需要把unicode字符串转换格式才能正常显示</Text>
        <View style={styles.collectionView}>
          {
            iconItems.map((item, index) => {
              return (
                <Text key={index} style={[styles.icon, {color: getColor()}]}>
                  {item.formatCode}
                </Text>
              )
            })
          }
        </View>
        <Text style={styles.tip}>单个使用时不需要转换，直接使用unicode编码</Text>
        <View style={styles.collectionView}>
          <Text style={styles.icon}>&#xe68f;</Text>
          <Text style={styles.icon}>&#xe690;</Text>
          <Text style={styles.icon}>&#xe691;</Text>
          <Text style={styles.icon}>&#xe692;</Text>
          <Text style={styles.icon}>&#xe693;</Text>
          <Text style={styles.icon}>&#xe694;</Text>
          <Text style={styles.icon}>&#xe695;</Text>
          <Text style={styles.icon}>&#xe696;</Text>
          <Text style={styles.icon}>&#xe697;</Text>
          <Text style={styles.icon}>&#xe698;</Text>
          <Text style={styles.icon}>&#xe699;</Text>
          <Text style={styles.icon}>&#xe69a;</Text>
          <Text style={styles.icon}>&#xe69b;</Text>
          <Text style={styles.icon}>&#xe69c;</Text>
          <Text style={styles.icon}>&#xe69d;</Text>
          <Text style={styles.icon}>&#xe69e;</Text>
          <Text style={styles.icon}>&#xe69f;</Text>
          <Text style={styles.icon}>&#xe6a0;</Text>
          <Text style={styles.icon}>&#xe6a1;</Text>
          <Text style={styles.icon}>&#xe6a2;</Text>
          <Text style={styles.icon}>&#xe6a3;</Text>
          <Text style={styles.icon}>&#xe6a4;</Text>
          <Text style={styles.icon}>&#xe6a6;</Text>
          <Text style={styles.icon}>&#xe6a7;</Text>
        </View>
      </ScrollView>
    )
  }
}

function getColor() {
  let number = Math.floor(Math.random()*4);
  let color = 'black';
  switch (number) {
    case 0:
      color = '#ff5500';
      break;
    case 1:
      color = '#00c06d';
      break;
    case 2:
      color = '#f57495';
      break;
    case 3:
      color = '#666fff';
      break;
  }
  return color;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f0f0f0',
  },
  tip: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  collectionView: {
    padding:20,
    flexDirection:'row',
    flexWrap:'wrap'
  },
  icon: {
    fontFamily:'iconfont',
    fontSize: 24,
    margin: 10,
  }
});


// Note: '&#x68f;' is a string, need to be converted to unicode format
const iconItems = [
  {unicode: '&#xe68f;', formatCode: '\ue68f'},
  {unicode: '&#xe690;', formatCode: '\ue690'},
  {unicode: '&#xe691;', formatCode: '\ue691'},
  {unicode: '&#xe692;', formatCode: '\ue692'},
  {unicode: '&#xe693;', formatCode: '\ue693'},
  {unicode: '&#xe694;', formatCode: '\ue694'},
  {unicode: '&#xe695;', formatCode: '\ue695'},
  {unicode: '&#xe696;', formatCode: '\ue696'},
  {unicode: '&#xe697;', formatCode: '\ue697'},
  {unicode: '&#xe698;', formatCode: '\ue698'},
  {unicode: '&#xe699;', formatCode: '\ue699'},
  {unicode: '&#xe69a;', formatCode: '\ue69a'},
  {unicode: '&#xe69b;', formatCode: '\ue69b'},
  {unicode: '&#xe69c;', formatCode: '\ue69c'},
  {unicode: '&#xe69d;', formatCode: '\ue69d'},
  {unicode: '&#xe69e;', formatCode: '\ue69e'},
  {unicode: '&#xe69f;', formatCode: '\ue69f'},
  {unicode: '&#xe6a0;', formatCode: '\ue6a0'},
  {unicode: '&#xe6a1;', formatCode: '\ue6a1'},
  {unicode: '&#xe6a2;', formatCode: '\ue6a2'},
  {unicode: '&#xe6a3;', formatCode: '\ue6a3'},
  {unicode: '&#xe6a4;', formatCode: '\ue6a4'},
  {unicode: '&#xe6a6;', formatCode: '\ue6a6'},
  {unicode: '&#xe6a7;', formatCode: '\ue6a7'},
];