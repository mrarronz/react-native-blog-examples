import React from 'react';
import {View, Button, StyleSheet, Alert, NativeModules} from 'react-native';

const nativeModule = NativeModules.OpenNativeModule;

export default class IndexScreen extends React.PureComponent {
  
  render() {
    return (
      <View style={styles.container}>
        <Button title={'扫描二维码'} onPress={() => this.scanQRCode()}/>
      </View>
    )
  }
  
  scanQRCode() {
    nativeModule.scanQRCode((result) => {
      Alert.alert('扫描结果', result,
        [
          {text:'确定', onPress:() => {}}
        ],
        {cancelable: false}
      );
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  }
});