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
   TextInput,
  Switch,
  TouchableOpacity
 } from 'react-native';
 import axios from "axios"
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { Card, Button, CheckBox } from 'react-native-elements'

 import { base_url, main_color } from "./const"
import { ToastAndroid } from 'react-native';
import { set } from 'react-native-reanimated';

 

 class Phone extends Component{
 
   constructor(props){
     super(props);
     this.state={
       phone:"",
       checked:false,
       phone_data:[]
     }
     this.userId = this.props.route.params.userId
     this.getData();
   }
 
   componentDidMount(){
    
   }

   getData=()=>{
    axios({
      method: 'post',
      url: base_url+'/user/getPhone',
      headers: { "Content-Type": "text/plain" },
      data: this.userId

  })
  .then(
    (response) => {
      this.setState({phone_data:response.data})
    }, (error) => {
    console.log(error);
    ToastAndroid.show("Network error",ToastAndroid.SHORT)
    }
    );
   }

   add_phone=()=>{
    if(this.state.phone!="" && this.state.phone.length==10)
    {
      axios({
        method: 'post',
        url: base_url + '/user/addPhone',
        data: {
            user_id:this.userId,
            phone:this.state.phone,
            isDefault:this.state.checked
        }
  
      })
        .then(
          (response) => {
            this.setState({phone:"",checked:false})
            ToastAndroid.show("Added successfully",ToastAndroid.SHORT)            
            this.getData()
          }, (error) => {
            console.log('error', error);
            ToastAndroid.show("Internal error",ToastAndroid.SHORT)
            
          }
        );
    }
   }

   delete=(id)=>{
     
    axios({
      method: 'post',
      url: base_url + '/user/removePhone',
      headers: { "Content-Type": "text/plain" },
      data: ""+id

    })
      .then(
        (response) => {
          this.getData()
          ToastAndroid.show("deleted successfully",ToastAndroid.SHORT)            

        }, (error) => {
          console.log('error', error);
          ToastAndroid.show("Internal error",ToastAndroid.SHORT)
          
        }
      );
   }

   makeDefault=(id)=>{
     
    axios({
      method: 'post',
      url: base_url + '/user/makeDefaultPhone',
      data:{
        user_id:this.userId,
        id:id
      }

    })
      .then(
        (response) => {
          this.getData()
          ToastAndroid.show("change successfully",ToastAndroid.SHORT)            

        }, (error) => {
          console.log('error', error);
          ToastAndroid.show("Internal error",ToastAndroid.SHORT)
          
        }
      );
   }
 
   render(){
     return (
         <ScrollView  style={styles.container}>

           <Card wrapperStyle={styles.card}>
           <TextInput style={styles.field} value={this.state.phone} placeholder="Phone Number" keyboardType="number-pad" onChangeText={(phone) => this.setState({ phone })} />
           <View style={{flexDirection:'row'}}> 
            <Text>Default</Text>
           <Switch style={{marginLeft:0}}
          trackColor={{ false: "#767577", true: main_color }}
          thumbColor={"white"}
          onValueChange={()=>{this.setState({checked:!this.state.checked})}}
          value={this.state.checked}/> 

           </View>
           
           <Button buttonStyle={styles.add_button}   title="   Add   " onPress={this.add_phone} />

           </Card>
           {this.state.phone_data.map((data)=>{
             return <Card key={data.phone_id}><Card.Title style={{textAlign:'left'}}>{data.phone}</Card.Title>
             <Card.Divider/>
             <View style={{flexDirection:'row-reverse'}}>
               <Button  buttonStyle={styles.touch_op1} titleStyle={{color:main_color}}  title="Delete" onPress={()=>this.delete(data.phone_id)}/>
               <Button  buttonStyle={styles.touch_op2} disabled={data.default} titleStyle={{color:main_color}} title="Make Default" onPress={()=>this.makeDefault(data.phone_id)}/>
             </View>
             </Card>
           })}
           

        </ScrollView>
     );
   }
 }
 
 const styles = StyleSheet.create({
  container:{
    flex:1,
  
  },
  field: {
    backgroundColor: "#f0ebeb",
    marginBottom:10,
    paddingLeft: 15,
    paddingRight:15,
    borderRadius: 5,
    textAlign:'center'
  },
  add_button: {
    backgroundColor: main_color,
   },
  card:{
    

  },
  touch_op1:{
    marginLeft:5,
    padding:5,
    backgroundColor:'white',
    borderRadius:5,

  },
  touch_op2:{
    marginLeft:5,
    padding:5,
    backgroundColor:'white',
    borderRadius:5,

  },
  

 
 });
 
 export default Phone;
 