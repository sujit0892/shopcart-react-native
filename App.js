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

const Stack = createStackNavigator();
class App extends Component{

  constructor(){
    super();
    this.state={
      isVisible:true,
      defaultScree:true
    }
    this.getData()
    
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_id')
      console.log("fetch")
      if(value !== null) {
        this.setState({defaultScree:false})
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

        <NavigationContainer>
              <Stack.Navigator  >
                        {this.state.defaultScree && <Stack.Screen  name="login"  component={Login}  options={{ headerShown: false }} />  }
                        <Stack.Screen  name="home"  component={Home}  options={{ headerShown: false }} /> 
               </Stack.Navigator>  
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
 container:{
   flex:1,
   justifyContent:'center',
   alignItems:'center'

 },

});

export default App;
