/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Component } from 'react';
 import 'react-native-gesture-handler';

 import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
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

 
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 
 const Drawer = createDrawerNavigator();

 class Home extends Component{
 
   constructor(){
     super();
    
     
   }
 
  //  componentDidMount(){
  //   console.log('this.props',this.props)
  //   BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
  //  }
   
  //  handleBackButton(){
  //    BackHandler.exitApp()
  //  }

  //  componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  // }

   render(){
     return (

     <View styles={styles.container}>
       <Text>Home</Text></View>

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
 
 export default Home;
 