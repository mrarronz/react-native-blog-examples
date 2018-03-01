import React, {Component} from 'react';

export default class BaseComponent extends Component {
  
  static screen;
  
  /// 页面组件初始化时获取当前页面的实例
  constructor(props) {
    super(props);
    BaseComponent.screen = this;
  }
  
  /// 返回当前页面的navigation
  nav() {
    return this.props.navigation;
  }
  
}