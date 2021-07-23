/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Component } from 'react';
 import 'react-native-gesture-handler';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { LOGIN, LOGOUT } from './action/type';
 
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   BackHandler
 
 
 } from 'react-native';
 import SplashScreen from 'react-native-splash-screen';
 
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 
 import Login from './login'
 import Home from './home'
 import Profile from './profile'
 import Search from './search'
 import Cart from './cart'
 import Order from './order'
 
 import {
   createDrawerNavigator,
   DrawerContentScrollView,
   DrawerItemList,
   DrawerItem,
 } from '@react-navigation/drawer';
 import { Button } from 'react-native-elements';
 import Logout from './logout';
 import { connect } from 'react-redux';

 
 const Stack = createStackNavigator();
 const Drawer = createDrawerNavigator();
 
 
 class  DrawerNav extends Component {
 
   constructor() {
     super();
 
     this.state = {
       isVisible: true,
       user_id: "",
       isLogin: false
     }
     this.getData()
     this.handleBackButton = this.handleBackButton.bind(this)
   }
 
   getData = async () => {
     try {
       const value = await AsyncStorage.getItem('user_id')
       if (value !== null) {
         this.setState({ login_val: true })
         this.props.login()
       }
 
     } catch (e) {
       // error reading value
       console.log(e)
     }
   }
 
 
 
   componentDidMount() {
     SplashScreen.hide();

      // console.log('this.props',this.props)
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
   }
    handleBackButton(){
     BackHandler.exitApp()
   }

   componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
 
   render() {
     return (
     
 
         
      
         <Drawer.Navigator defaultScreenOptions={true} detachInactiveScreens={true}>
           <Drawer.Screen name="ShopCart" component={Home} options={{ headerStyle: { backgroundColor: 'white' }, headerTintColor: '#673AB7', drawerActiveTintColor: '#673AB7' }} />
           {this.props.isLogin && <Drawer.Screen name="Profile" component={Profile} options={{ headerStyle: { backgroundColor: 'white', borderBottomColor:"#CCCCCC",borderBottomWidth:1, }, headerTintColor: '#673AB7', drawerActiveTintColor: '#673AB7' }} />}
           <Drawer.Screen name="Search" component={Search} options={{ headerStyle: { backgroundColor: 'white' }, headerTintColor: '#673AB7', drawerActiveTintColor: '#673AB7' }} />
           <Drawer.Screen name="Cart" component={Cart} options={{ headerStyle: { backgroundColor: 'white' }, headerTintColor: '#673AB7', drawerActiveTintColor: '#673AB7' }} />
           <Drawer.Screen name="Order" component={Order} options={{ headerStyle: { backgroundColor: 'white' }, headerTintColor: '#673AB7', drawerActiveTintColor: '#673AB7' }} />
           {this.props.isLogin && <Drawer.Screen name="Logout" component={Logout} options={{ headerStyle: { backgroundColor: 'white' }, headerTintColor: '#673AB7', drawerActiveTintColor: '#673AB7' }} />}
 
         </Drawer.Navigator>
        
 
 
       // <NavigationContainer >
       // <Stack.Navigator>
       // <Stack.Screen  name="ChangePassword"  component={ChangePassword}  /> 
       // </Stack.Navigator>
       // </NavigationContainer>
       // </View>
 
     );
   }
 }
 
 
 
 
 
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
 
 
   },
 
 });
 
 const mapStateToProps = state => ({
   isLogin: state.isLogin,
 });
 
 const mapDispatchToProps = dispatch => ({
   login: () => dispatch({ type: LOGIN })
 });
 
 export default connect(mapStateToProps, mapDispatchToProps)(DrawerNav)
 
 