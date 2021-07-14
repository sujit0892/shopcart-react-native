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
import DrawerNav from './Component/DrawerNav';
import { main_color } from './Component/const';
import ChangePassword from './Component/ChangePassword';
import Phone from './Component/Phone';
import Address from './Component/Address';



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
          <StatusBar backgroundColor={main_color}/>
              <Stack.Navigator  >
                        
                        <Stack.Screen  name="home"  component={DrawerNav}  options={{ headerShown: false }} /> 
                        <Stack.Screen  name="ChangePassword"  component={ChangePassword}  options={{ headerShown: true},{headerTintColor:main_color}} />
                        <Stack.Screen  name="ManagePhone"  component={Phone}  options={{ headerShown: true},{headerTintColor:main_color}} /> 
                        <Stack.Screen  name="ManageAddress"  component={Address}  options={{ headerShown: true},{headerTintColor:main_color}} />  
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