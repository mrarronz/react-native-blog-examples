import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import DetailScreen from "./DetailScreen";
import ModalPage from "./ModalPage";


export function registerScreens() {
  Navigation.registerComponent('Home', () => HomeScreen);
  Navigation.registerComponent('Profile', () => ProfileScreen);
  Navigation.registerComponent('Detail', () => DetailScreen);
  Navigation.registerComponent('Modal', () => ModalPage);
}

export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
    didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
    willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
    didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
  }).register();
}