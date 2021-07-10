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
  
 
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Login from './Component/login'
import Home from './Component/home'
import Profile from './Component/profile'
import Search from './Component/search'
import Cart from './Component/cart'
import Order from './Component/order'

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Button } from 'react-native-elements';
import Logout from './Component/logout';
import { createStore } from 'redux'

import { Provider } from 'react-redux'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default class App extends Component{

  constructor(){
    super();
    
    this.state={
      isVisible:true,
      login_val:false
    }
    this.getData()
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_id')
      console.log("fetch")
      if(value !== null) {
        this.setState({login_val:true})
      }
      
    } catch(e) {
      // error reading value
      console.log(e)
    }
  }

  

  componentDidMount(){
    SplashScreen.hide();

}
  

  render(){
    return (
      
        <NavigationContainer >
          <StatusBar backgroundColor="white" barStyle='dark-content'/>
          <Drawer.Navigator defaultScreenOptions={true}>
            <Drawer.Screen name="ShopCart" component={Home} options={{headerStyle:{backgroundColor:'white'},headerTintColor:'#673AB7',drawerActiveTintColor:'#673AB7'}} />
            {this.state.login_val && <Drawer.Screen name="Profile" component={Profile} options={{headerStyle:{backgroundColor:'white'},headerTintColor:'#673AB7',drawerActiveTintColor:'#673AB7'}}/>}
            {!this.state.login_val && <Drawer.Screen name="Login" component={Login} options={{headerStyle:{backgroundColor:'white'},headerTintColor:'#673AB7',drawerActiveTintColor:'#673AB7'}}/>}
            <Drawer.Screen name="Search" component={Search} options={{headerStyle:{backgroundColor:'white'},headerTintColor:'#673AB7',drawerActiveTintColor:'#673AB7'}} />
            <Drawer.Screen name="Cart" component={Cart} options={{headerStyle:{backgroundColor:'white'},headerTintColor:'#673AB7',drawerActiveTintColor:'#673AB7'}} />
            <Drawer.Screen name="Order" component={Order} options={{headerStyle:{backgroundColor:'white'},headerTintColor:'#673AB7',drawerActiveTintColor:'#673AB7'}} />
            {this.state.login_val && <Drawer.Screen name="Logout" component={Logout} options={{headerStyle:{backgroundColor:'white'},headerTintColor:'#673AB7',drawerActiveTintColor:'#673AB7'}}/>}
            
          </Drawer.Navigator>
        </NavigationContainer>
    );
  }
}




const styles = StyleSheet.create({
 container:{
   flex:1,
   justifyContent:'center',
   alignItems:'center',
   
  
 },

});

