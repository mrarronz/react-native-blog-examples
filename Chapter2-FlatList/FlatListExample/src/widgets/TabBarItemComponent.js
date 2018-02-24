import React, {Component} from 'react';
import {Image} from 'react-native';

export default class TabBarItemComponent extends Component {
  
  render() {
    let {selectedImage, normalImage, focused, tintColor} = this.props;
    let pressedImage = selectedImage ? selectedImage : normalImage;
    return (
      <Image
        source={focused ? pressedImage : normalImage}
        style={{tintColor: tintColor, width: 24, height: 24}}
      />
    )
  }
}