/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import MovieListScreen from "./src/screen/MovieListScreen";

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <MovieListScreen/>
    );
  }
}
