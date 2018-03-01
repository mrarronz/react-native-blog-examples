import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {StackNavigator, createNavigator, createNavigationContainer, TabRouter, addNavigationHelpers} from 'react-navigation';
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import DetailPage from "./DetailPage";

const FirstNavScreen = StackNavigator(
  {
    First: {
      screen: Page1,
      navigationOptions:({navigation}) => ({
        headerTitle: '首页'
      })
    },
    Detail: {
      screen: DetailPage,
      navigationOptions:({navigation}) => ({
        headerTitle: '详情页'
      })
    }
  },
  {
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: '#333333',
      headerTitleStyle: {fontSize:18, fontWeight:'bold', color:'#333333', alignSelf:'center'},
      headerStyle: {backgroundColor: "#F5F5FA", height: 50},
      showIcon: true,
    },
    mode: 'card',
    // headerMode: 'screen',
  }
);

const SecondNavScreen = StackNavigator(
  {
    Second: {
      screen: Page2,
      navigationOptions:({navigation}) => ({
        headerTitle: '页面2'
      })
    },
  },
  {
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: '#333333',
      headerTitleStyle: {fontSize:18, fontWeight:'bold', color:'#333333', alignSelf:'center'},
      headerStyle: {backgroundColor: "#F5F5FA", height: 50},
      showIcon: true,
    },
    mode: 'card',
    // headerMode: 'screen',
  }
);

const ThirdNavScreen = StackNavigator(
  {
    Third: {
      screen: Page3,
      navigationOptions:({navigation}) => ({
        headerTitle: '页面3'
      })
    },
  },
  {
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: '#333333',
      headerTitleStyle: {fontSize:18, fontWeight:'bold', color:'#333333', alignSelf:'center'},
      headerStyle: {backgroundColor: "#F5F5FA", height: 50},
      showIcon: true,
    },
    mode: 'card',
    // headerMode: 'screen',
  }
);

const FourthNavScreen = StackNavigator(
  {
    Fourth: {
      screen: Page4,
      navigationOptions:({navigation}) => ({
        headerTitle: '页面4'
      })
    },
  },
  {
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: '#333333',
      headerTitleStyle: {fontSize:18, fontWeight:'bold', color:'#333333', alignSelf:'center'},
      headerStyle: {backgroundColor: "#F5F5FA", height: 50},
      showIcon: true,
    },
    mode: 'card',
    // headerMode: 'screen',
  }
);

const MyFirstScreen = ({navigation}) =>(
  <FirstNavScreen/>
);

const MySecondScreen = ({navigation}) => (
  <SecondNavScreen/>
);

const MyThirdScreen = ({navigation}) => (
  <ThirdNavScreen/>
);

const MyFourthScreen = ({navigation}) => (
  <FourthNavScreen/>
);

const CustomTabRouter = TabRouter(
  {
    First: {
      screen: MyFirstScreen,
      path: '',
    },
    Second: {
      screen: MySecondScreen,
      path: 'secondScreen',
    },
    Third: {
      screen: MyThirdScreen,
      path: 'thirdScreen',
    },
    Fourth: {
      screen: MyFourthScreen,
      path: 'fourthScreen',
    }
  },
  {
    initialRouteName: 'First',
  }
);

const CustomTabBar = ({navigation, activeRoute}) => {
  const { routes } = navigation.state;
  console.log(routes);
  return (
    <View style={styles.tabContainer}>
      {routes.map(route => (
        <TouchableOpacity
          onPress={() => navigation.navigate(route.routeName)}
          key={route.routeName}
        >
          <Text style={[styles.itemTitle, activeRoute===route.routeName ? styles.active : styles.inactive]}>{route.routeName}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const CustomTabView = ({ router, navigation }) => {
  const { routes, index } = navigation.state;
  const ActiveScreen = router.getComponentForRouteName(routes[index].routeName);
  console.log(ActiveScreen);
  console.log(routes);
  console.log(index);
  const activeRouteName = routes[index].routeName;
  return (
    <View style={styles.container}>
      <CustomTabBar navigation={navigation} activeRoute={activeRouteName}/>
      <ActiveScreen
        navigation={addNavigationHelpers({
          dispatch: navigation.dispatch,
          state: routes[index],
        })}
        screenProps={{}}
      />
    </View>
  )
};

const CustomTabs = createNavigationContainer(
  createNavigator(CustomTabRouter)(CustomTabView)
);

export default CustomTabs;


const styles = StyleSheet.create({
  tabContainer: {
    width: 84,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#e7e7e7',
    zIndex:999,
    borderRightWidth:1,
    borderColor: '#e0e0e0'
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: 'black'
  },
  active: {
    color: 'red',
  },
  inactive: {
    color: 'black',
  },
  container: {
    flexDirection:'row',
    flex: 1,
  }
});