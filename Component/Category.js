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
   Button

 } from 'react-native';

 

 class Category extends Component{
 
   constructor(props){
     super(props);
     this.category_name = this.props.route.params.cat_name
     this.cat_id = this.props.route.params.cat_id
   }
 
   componentDidMount() {
    this.props.navigation.setOptions({
      title: this.category_name,
    })
  }
 
   render(){
     return (
         <View  style={styles.container}>
             <Button style={styles.button} title='Browse all>>' onPress={()=>{this.props.navigation.navigate('Browse',{cat_name:this.category_name,cat_id:this.cat_id})}}/>
        </View>
     );
   }
 }
 
 const styles = StyleSheet.create({
  container:{
    flex:1,

 
  },
  button:{
      marginTop:1
  }
 
 });
 
 export default Category;
 