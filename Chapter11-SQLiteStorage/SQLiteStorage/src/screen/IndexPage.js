import {Navigation} from 'react-native-navigation';
import HomeScreen from "./HomeScreen";
import AddItemScreen from "./AddItemScreen";

export function registerScreens() {
  Navigation.registerComponent('Home', () => HomeScreen);
  Navigation.registerComponent('AddItem', () => AddItemScreen);
}