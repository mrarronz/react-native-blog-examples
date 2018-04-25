import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import CustomIconFont from './CustomIconFont';
import {getColor} from "../IconfontBasic/IconFontBasicScreen";

export default class IconFontAdvancedScreen extends React.Component {
  
  static navigationOptions = {
    headerTitle:'Iconfont Advanced'
  };
  
  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{padding: 20}}>
        <View style={styles.collectionView}>
          <CustomIconFont name={'tubiaozhizuomobanyihuifu_'} size={24} color={getColor()}/>
          <CustomIconFont name={'tubiaozhizuomobanyihuifu_1'} size={24} color={getColor()}/>
          <CustomIconFont name={'tubiaozhizuomobanyihuifu_2'} size={24} color={getColor()}/>
          <CustomIconFont name={'tubiaozhizuomobanyihuifu_3'} size={24} color={getColor()}/>
          <CustomIconFont name={'tubiaozhizuomobanyihuifu_4'} size={24} color={getColor()}/>
          <CustomIconFont name={'tubiaozhizuomobanyihuifu_5'} size={24} color={getColor()}/>
          <CustomIconFont name={'tubiaozhizuomobanyihuifu_6'} size={24} color={getColor()}/>
          <CustomIconFont name={'tubiaozhizuomobanyihuifu_7'} size={24} color={getColor()}/>
          <CustomIconFont name={'tubiaozhizuomobanyihuifu_8'} size={24} color={getColor()}/>
          <CustomIconFont name={'tubiaozhizuomobanyihuifu_9'} size={24} color={getColor()}/>
          <CustomIconFont name={'tubiaozhizuomobanyihuifu_10'} size={24} color={getColor()}/>
          <CustomIconFont name={'tubiaozhizuomobanyihuifu_11'} size={24} color={getColor()}/>
          <CustomIconFont name={'tubiaozhizuomobanyihuifu_12'} size={24} color={getColor()}/>
          <CustomIconFont name={'tubiaozhizuomobanyihuifu_13'} size={24} color={getColor()}/>
          <CustomIconFont name={'tubiaozhizuomobanyihuifu_14'} size={24} color={getColor()}/>
          <CustomIconFont name={'tubiaozhizuomobanyihuifu_15'} size={24} color={getColor()}/>
          <CustomIconFont name={'tubiaozhizuomobanyihuifu_16'} size={24} color={getColor()}/>
          <CustomIconFont name={'tubiaozhizuomobanyihuifu_17'} size={24} color={getColor()}/>
          <CustomIconFont name={'tubiaozhizuomobanyihuifu_18'} size={24} color={getColor()}/>
          <CustomIconFont name={'tubiaozhizuomobanyihuifu_19'} size={24} color={getColor()}/>
          <CustomIconFont name={'tubiaozhizuomobanyihuifu_20'} size={24} color={getColor()}/>
          <CustomIconFont name={'tubiaozhizuomobanyihuifu_21'} size={24} color={getColor()}/>
          <CustomIconFont name={'tubiaozhizuomobanyihuifu_22'} size={24} color={getColor()}/>
          <CustomIconFont name={'tubiaozhizuomobanyihuifu_23'} size={24} color={getColor()}/>
        </View>
        <Text style={styles.title}>Usage Steps:</Text>
        <Text style={styles.description}>1. Download icon material from <Text style={styles.link}>http://www.iconfont.cn</Text>.</Text>
        <Text style={styles.description}>2. Drag iconfont.ttf to specified Android and iOS project directory and complete related config.</Text>
        <Text style={styles.description}>3. Convert iconfont.svg file to iconfont.json automatically with script.</Text>
        <Text style={styles.description}>4. Drag iconfont.json to project folder and create custom icon font according to <Text style={styles.link}>react-native-vector-icons</Text>.</Text>
        <Text style={styles.description}>5. Use the custom icon font in code, just as you see in this class. 😁😁😁</Text>
        <Text style={styles.title}>Points should be noticed:</Text>
        <Text style={styles.description}>1. How to get 'iconfont.json' by converting 'iconfont.svg' with script?</Text>
        <Text style={styles.description}>2. How to create custom icon font with 'react-native-vector-icons'?</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f0f0f0',
  },
  collectionView: {
    flexDirection:'row',
    flexWrap:'wrap'
  },
  title: {
    fontSize: 18,
    fontWeight:'bold',
    marginTop: 20
  },
  description: {
    fontSize: 15,
    color: '#8e5dff',
    marginTop: 10
  },
  link: {
    color: '#1979ff'
  }
});