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


 

 class Profile extends Component{
 
   constructor(){
     super();
   }
 
   componentDidMount(){
    
   }
 
   render(){
     return (
         <View  style={styles.container}>
        
           <Text>Profile</Text>
           <Button title="Goto homescreen>" onPress = {()=>this.props.navigation.navigate('HomeScreen')}/>
           </View>
     );
   }
 }
 
 const styles = StyleSheet.create({
  container:{
    //flex:1,
    justifyContent:'center',
    alignItems:'center'
 
  },
 
 });
 
 export default Profile;
 