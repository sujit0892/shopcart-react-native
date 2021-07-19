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
 import { Card, Button, CheckBox } from 'react-native-elements'
import { main_color } from './const';
 

 class ManageProduct extends Component{
 
   constructor(props){
     super(props);
     this.userId = this.props.route.params.userId
   }
 
   componentDidMount(){
    
   }
   open_model(){

   }
   render(){
     return (
         <ScrollView style={styles.container}>
             <Text>Manage Product</Text>
         </ScrollView>
     );
   }
 }
 
 const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  add_button: {
    backgroundColor: main_color,
   },
 
 });
 
 export default ManageProduct;
 