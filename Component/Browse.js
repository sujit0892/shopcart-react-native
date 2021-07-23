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
   ToastAndroid,FlatList,TouchableOpacity,
   Image

 } from 'react-native';
 import axios from "axios"
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { Card, Button, CheckBox } from 'react-native-elements'
 import {  CART } from './action/type';
 import { connect } from 'react-redux';
 import { base_url, main_color } from "./const"
 import {Picker} from '@react-native-picker/picker';

 class Browse extends Component{
 
   constructor(props){
     super(props);
     this.state = {
       prod_data:[],
       show:true,
       filter:"Filter"
     }
     this.category_name = this.props.route.params.cat_name
     this.cat_id = this.props.route.params.cat_id
     
   }
 
   componentDidMount(){
    this.props.navigation.setOptions({
        title: this.category_name,
      })
      this.getProduct()
   }

   getProduct=()=>{
    axios({
        method: 'get',
        url: base_url+'/product/getProductByCat/'+this.cat_id,

  
    })
    .then(
      (response) => {
        this.setState({prod_data:response.data})
       
      }, (error) => {
      console.log(error);
      ToastAndroid.show("Network error",ToastAndroid.SHORT)
      }
      );
   }

   sort_data=(val)=>
   {
      
      if(val==1||val==2)
      {
        
        this.state.prod_data.sort(function(a, b) {
          if (val==2) {
              return (a['price'] > b['price']) ? 1 : ((a['price'] < b['price']) ? -1 : 0);
          } else {
              return (b['price'] > a['price']) ? 1 : ((b['price'] < a['price']) ? -1 : 0);
          }
      });
      }
      else{
        this.state.prod_data.sort(function(a, b) {
          if (val==4) {
              return (a['rating'] > b['rating']) ? 1 : ((a['rating'] < b['rating']) ? -1 : 0);
          } else {
              return (b['rating'] > a['rating']) ? 1 : ((b['rating'] < a['rating']) ? -1 : 0);
          }
      });
      }
   }
 
   render(){
     return (
        <View style={{flex:1}}>
            <Picker 
            selectedValue={this.state.filter}
            onValueChange={(itemValue, itemIndex) =>
             { this.setState({filter:itemValue,})
               this.sort_data(itemValue)
                } } >
            {this.state.show && <Picker.Item label="Filter" value="" style={{fontSize:18, fontWeight:'500'}} enabled={false}/>}
            <Picker.Item label="price : high to low" value="1" />
            <Picker.Item label="price : low to high" value="2" />
            <Picker.Item label="rating : high to low" value="3" />
            <Picker.Item label="rating : low to high" value="4" />
            
            </Picker>
         <SafeAreaView  style={styles.container}>
          
         <FlatList
            data={this.state.prod_data}
            renderItem={({ item }) => (
              <TouchableOpacity style={{flex:1}} onPress={()=>{this.props.navigation.navigate('Product',{'product_id':item.asin})}} >              
                <Card containerStyle={styles.card} >
                <Card.Image source={{uri: item.images[0].url}}  />
                <View style={{flexDirection:'row',marginTop:5}}>
                <Text style={{fontSize:18, color:'#323232'}}>{item.name}</Text>
                <Text style={{fontSize:18, color:'#323232',marginLeft:120}}>{item.rating}<Image source={require('./icon/star.png')}/></Text>
                </View>
                <Text style={{fontSize:20,fontWeight:'bold', color:'#323232'}}>${item.price}</Text>
                {item.stock<=0 && <Text style={{fontSize:12, color:'red'}}>Out of Stock</Text>}
              </Card>
              </TouchableOpacity>

            )}
      //Setting the number of column
            numColumns={2}
            keyExtractor={(item) => item.category_id}
         />
         
           </SafeAreaView>
           </View>
     );
   }
 }
 
 const styles = StyleSheet.create({
  container:{
    flex:1,
 
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width:50

  },
  card:{
    flex:1,
    flexDirection:'column',
    margin:0,
    alignContent:'center'
    
  }
 
 });

 
export default Browse
 