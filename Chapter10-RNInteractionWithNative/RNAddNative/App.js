import {Navigation} from 'react-native-navigation';
import {registerScreens, registerScreenVisibilityListener} from "./src/screen/IndexPage";

registerScreens();
registerScreenVisibilityListener();

const tabs = [
  {
    label: '首页',
    screen: 'Home',
    icon: require('./src/images/icon_tab_home_normal.png'),
    selectedIcon: require('./src/images/icon_tab_home_pressed.png'),
    title: '首页',
  },
  {
    label: '我的',
    screen: 'Profile',
    icon: require('./src/images/icon_tab_user_normal.png'),
    selectedIcon: require('./src/images/icon_tab_user_pressed.png'),
    title: '我的',
  },
];

Navigation.startTabBasedApp({
  tabs,
  tabsStyle: {
    tabBarButtonColor: '#999',
    tabBarSelectedButtonColor: '#4ca5ff',
    tabBarBackgroundColor: '#fff',
    tabBarLabelColor:'#999',
    tabBarSelectedLabelColor:'#4ca5ff',
    initialTabIndex: 0,
  },
  appStyle: {
    orientation: 'portrait',
    bottomTabBadgeTextColor: 'white',
    bottomTabBadgeBackgroundColor: '#ff505c',
    hideBackButtonTitle: true,
    navBarTextColor: '#ffffff',
    navBarButtonColor: 'white',
    navBarBackgroundColor: '#4ca5ff',
    navBarSubtitleColor: 'white',
    navBarSubtitleFontSize: 13,
  },
});