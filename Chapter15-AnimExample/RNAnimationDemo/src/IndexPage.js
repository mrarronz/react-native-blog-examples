import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';
import {AnimatedUsageScreen} from "./screen/AnimatedUsageScreen";
import {LayoutAnimationScreen} from "./screen/LayoutAnimationScreen";
import {RealWorldDemoScreen} from "./screen/RealWorldDemoScreen";


export function registerScreens() {
  Navigation.registerComponent('Animated', () => AnimatedUsageScreen);
  Navigation.registerComponent('LayoutAnimation', () => LayoutAnimationScreen);
  Navigation.registerComponent('Demos', () => RealWorldDemoScreen);
}

export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
    didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
    willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
    didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
  }).register();
}