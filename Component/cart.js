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

 

 class Cart extends Component{
 
   constructor(){
     super();
   }
 
   componentDidMount(){
    
   }
 
   render(){
     return (
         <View  style={styles.container}>
           
           <Text>Cart</Text>
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
 
 export default Cart;
 