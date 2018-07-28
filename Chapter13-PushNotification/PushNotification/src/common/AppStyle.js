import {StyleSheet, Dimensions} from 'react-native';
import AppColor from "./AppColor";

export const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f0f0f0'
  },
  buttonTitleBig: {
    fontSize: 18,
    fontWeight:'bold',
    color: 'white',
  },
  buttonContainer: {
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    height: 50,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 6,
    backgroundColor: AppColor.themeColor,
    minWidth: Dimensions.get('window').width - 60
  }
});