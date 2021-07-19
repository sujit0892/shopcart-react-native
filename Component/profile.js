/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import { black, red } from 'chalk';
 import React, { Component } from 'react';
 import { main_color } from './const';


 
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
  Button, Image
 } from 'react-native';
import { Card } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"
import { base_url } from "./const"
 

 class Profile extends Component{
 
   constructor(){
     super();
     this.state={
       name:'',
       email:'',
       userId:''
     }
     this.getData()
   }

   getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_id')
      console.log("fetch")
      if (value !== null) {
          this.fetch(value)
          this.setState({userId:value})
      }

    } catch (e) {
      // error reading value
      console.log(e)
    }
  }

   fetch=(userId)=>{
          axios({
            method: 'post',
            url: base_url+'/user/getUser',
            headers: { "Content-Type": "text/plain" },
            data: userId

        })
        .then(
          (response) => {
            this.setState({name:response.data.name, email:response.data.email})
            

      }, (error) => {
      console.log(error);

      }
      );
   }
 
   componentDidMount(){
    
   }
 
   render(){
     return (
         <View  style={styles.container}>
           <View style={styles.name_main_container}>
             <View style={styles.icon_container}>
             <Image  style={{height:65,width:65}} source={require('./icon/user.png')}
             />
             </View>
             <View style={styles.name_container}>
              <Text style={styles.text_style}>{this.state.name}</Text>
              <Text style={styles.text_style}>{this.state.email}</Text>
             </View>
           </View>
           <View style={styles.manageContainer}>
            <TouchableOpacity style={styles.touch} onPress={()=>this.props.navigation.navigate('ChangePassword',{userId:this.state.userId})}>
            <Card >
              <View style={{alignItems:'center'}}>
            <Text style={styles.touch_text}>Change Password</Text></View>
            </Card>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touch} onPress={()=>this.props.navigation.navigate('ManagePhone',{userId:this.state.userId})}>
            <Card >
              <View style={{alignItems:'center'}}>
            <Text style={styles.touch_text}>Manage Phone</Text></View>
            </Card>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touch} onPress={()=>this.props.navigation.navigate('ManageAddress',{userId:this.state.userId})}>
            <Card >
              <View style={{alignItems:'center'}}>
            <Text style={styles.touch_text}>Manage Address</Text></View>
            </Card>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touch} onPress={()=>this.props.navigation.navigate('ManageProduct',{userId:this.state.userId})}>
            <Card >
              <View style={{alignItems:'center'}}>
            <Text style={styles.touch_text}>Manage Product</Text></View>
            </Card>
            </TouchableOpacity>
           </View>

           </View>
     );
   }
 }
 
 const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
 
  },
  name_main_container:{
    borderBottomColor:"#CCCCCC",
    borderBottomWidth:1,
    flexDirection:'row'
  },
  icon_container:{
    flex:2,
   padding:10,
 
  },
  name_container:{
    flex:8,
   
    justifyContent:'center'
  },

  text_style:{
    color:'#323232',
    fontSize:15,
    
  },
  manageContainer:{
    flex:1,

  },

  touch:{
    // padding:15,
    
  },

  touch_text:{
    color:main_color,
    fontWeight:'bold'
  }
 
 });
 
 export default Profile;
 