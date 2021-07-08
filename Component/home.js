/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Component } from 'react';
 import 'react-native-gesture-handler';
 
 
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
 

 class Home extends Component{
 
   constructor(){
     super();
   }
 
   componentDidMount(){
    
   }
 
   render(){
     return (
         <View  style={styles.container}>
           <StatusBar backgroundColor="#673AB7"/>
           <Text>Home</Text>
           </View>
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
 