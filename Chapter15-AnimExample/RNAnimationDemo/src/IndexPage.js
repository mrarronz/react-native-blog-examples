import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';
import {AnimatedUsageScreen} from "./screen/AnimatedUsageScreen";
import {LayoutAnimationScreen} from "./screen/LayoutAnimationScreen";
import {RealWorldDemoScreen} from "./screen/RealWorldDemoScreen";
import SpringAnimation from "./screen/animated/SpringAnimation";
import ShoppingButtonDemo from "./screen/demos/ShoppingButtonDemo";
import CommonAnimation from "./screen/layout/CommonAnimation";
import TimingAnimation from "./screen/animated/TimingAnimation";
import DecayAnimation from "./screen/animated/DecayAnimation";
import InterpolateAnimation from "./screen/animated/InterpolateAnimation";


export function registerScreens() {
  Navigation.registerComponent('Animated', () => AnimatedUsageScreen);
  Navigation.registerComponent('LayoutAnimation', () => LayoutAnimationScreen);
  Navigation.registerComponent('Demos', () => RealWorldDemoScreen);
  Navigation.registerComponent('Spring', () => SpringAnimation);
  Navigation.registerComponent('Timing', () => TimingAnimation);
  Navigation.registerComponent('Decay', () => DecayAnimation);
  Navigation.registerComponent('Interpolate', () => InterpolateAnimation);
  Navigation.registerComponent('ShoppingButton', () => ShoppingButtonDemo);
  Navigation.registerComponent('Common', () => CommonAnimation);
}

export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
    didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
    willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
    didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
  }).register();
}