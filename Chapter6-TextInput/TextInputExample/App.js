/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import RegisterScreen from "./src/screen/RegisterScreen";

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <RegisterScreen/>
    );
  }
}
