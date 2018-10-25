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
import GroupAnimation from "./screen/animated/GroupAnimation";
import CustomAnimComponent from "./screen/animated/CustomAnimComponent";
import GestureAnimation from "./screen/animated/GestureAnimation";
import RequestFrameAnimation from "./screen/animated/RequestFrameAnimation";
import AnimateWithNativeDriver from "./screen/animated/AnimateWithNativeDriver";
import CustomAnimation from "./screen/layout/CustomAnimation";


export function registerScreens() {
  Navigation.registerComponent('Animated', () => AnimatedUsageScreen);
  Navigation.registerComponent('LayoutAnimation', () => LayoutAnimationScreen);
  Navigation.registerComponent('Demos', () => RealWorldDemoScreen);
  Navigation.registerComponent('Spring', () => SpringAnimation);
  Navigation.registerComponent('Timing', () => TimingAnimation);
  Navigation.registerComponent('Decay', () => DecayAnimation);
  Navigation.registerComponent('Interpolate', () => InterpolateAnimation);
  Navigation.registerComponent('Group', () => GroupAnimation);
  Navigation.registerComponent('CustomComponent', () => CustomAnimComponent);
  Navigation.registerComponent('Gesture', () => GestureAnimation);
  Navigation.registerComponent('RequestFrame', () => RequestFrameAnimation);
  Navigation.registerComponent('NativeDriver', () => AnimateWithNativeDriver);
  Navigation.registerComponent('Common', () => CommonAnimation);
  Navigation.registerComponent('CustomAnim', () => CustomAnimation);
  Navigation.registerComponent('ShoppingButton', () => ShoppingButtonDemo);
}

export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
    didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
    willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
    didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
  }).register();
}