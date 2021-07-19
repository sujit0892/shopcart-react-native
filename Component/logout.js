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

 import { connect } from 'react-redux';
 
 import {
    StyleSheet,
    ActivityIndicator,
   View,
   Text

 } from 'react-native';
import { LOGOUT } from './action/type';

 

 class Logout extends Component{
 
   constructor(){
     super();
     this.logout()
     
   }

   logout = async () => {
    try {
      await AsyncStorage.setItem('user_id', "")
      this.props.logout();
      this.props.navigation.navigate("Login");
    } catch (e) {
      // saving error
      console.log(e)
    }
  }

   componentDidMount(){
    
   }
 
   render(){
     return (
         <View  style={styles.container}>
          
           <ActivityIndicator size="large" color="#673AB7" />
           <Text>Wait..</Text>
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
 
 const mapStateToProps = state => ({
});


const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: LOGOUT })
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
 