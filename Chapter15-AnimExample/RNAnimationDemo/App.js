import {Navigation} from 'react-native-navigation';
import {registerScreens, registerScreenVisibilityListener} from "./src/IndexPage";
import Icon from 'react-native-vector-icons';

registerScreens();
registerScreenVisibilityListener();


const tabs = [
  {
    label: 'Animated',
    screen: 'Animated',
    icon: require('./src/images/A.png'),
    selectedIcon: require('./src/images/A_selected.png'),
    title: 'Animated',
  },
  {
    label: 'LayoutAnimation',
    screen: 'LayoutAnimation',
    icon: require('./src/images/L.png'),
    selectedIcon: require('./src/images/L_selected.png'),
    title: 'LayoutAnimation',
  },
  {
    label: 'Demos',
    screen: 'Demos',
    icon: require('./src/images/D.png'),
    selectedIcon: require('./src/images/D_selected.png'),
    title: '动画实例',
  },
];

Navigation.startTabBasedApp({
  tabs,
  tabsStyle: {
    tabBarButtonColor: '#999',
    tabBarSelectedButtonColor: '#ff449f',
    tabBarBackgroundColor: '#fff',
    tabBarLabelColor:'#999',
    tabBarSelectedLabelColor:'#ff449f',
    initialTabIndex: 0,
  },
  appStyle: {
    orientation: 'portrait',
    bottomTabBadgeTextColor: 'white',
    bottomTabBadgeBackgroundColor: '#ff505c',
    hideBackButtonTitle: true,
    navBarTextColor: '#ffffff',
    navBarButtonColor: 'white',
    navBarBackgroundColor: '#ff449f',
    navBarSubtitleColor: 'white',
    navBarSubtitleFontSize: 13,
  },
});



