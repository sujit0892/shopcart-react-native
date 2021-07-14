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
 import axios from "axios"
 import { base_url, main_color } from "./const"
 
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   TextInput,
   ToastAndroid

 } from 'react-native';
 import { Card, Button } from 'react-native-elements'


 

 class ChangePassword extends Component{
 
   constructor(props){
     super(props);
     this.state={
      r_password: "",
      c_password: "",
      userId:this.props.route.params.userId
     }

   }

   ChangePasswords = () => {
    
     if(this.state.c_password==''||this.state.r_password=='')
     {
       ToastAndroid.show("All field are required",ToastAndroid.SHORT)
       return
     }
     if(this.state.c_password!=this.state.r_password)
    {
      ToastAndroid.show("Password didn't match",ToastAndroid.SHORT)
       return
    }
    axios({
      method: 'post',
      url: base_url + '/user/updatePassword',
      data: {
        user_id:this.state.userId,
        password:this.state.r_password
      }

    })
      .then(
        (response) => {
          console.log(Response.data)
          ToastAndroid.show("Password change Succesfully",ToastAndroid.SHORT)            

        }, (error) => {
          console.log('error', error);
          
        }
      );

   }
 
   componentDidMount(){
    
   }
 
   render(){
     return (
         <View  style={styles.container}>
         <Card containerStyle={styles.cards}>
           <Card.Title style={styles.cards_title}>Change Password</Card.Title>
           <TextInput style={styles.field} value={this.state.r_password} placeholder="Password" secureTextEntry={true} onChangeText={(r_password) => this.setState({ r_password })} />
            <TextInput style={styles.field} value={this.state.c_password} placeholder=" Confirm Password" secureTextEntry={true} onChangeText={(c_password) => this.setState({ c_password })} />
            <Button buttonStyle={{ backgroundColor: main_color }}  title="Change Password" onPress={this.ChangePasswords}/>

         </Card>
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
  field: {
    backgroundColor: "#f0ebeb",
    marginBottom: 15,
    paddingLeft: 15,
    borderRadius: 5
  },
  cards: {
    padding: 20,
    width: "85%",
    borderRadius: 5
  },
  cards_title: {
    color: main_color,
    fontWeight: "bold",
    fontSize: 25

  },
 
 });
 
 export default ChangePassword;
 