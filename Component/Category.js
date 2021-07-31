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
   Button,FlatList,Image

 } from 'react-native';
 import { Card } from 'react-native-elements';
 import { color } from 'react-native-elements/dist/helpers';
 import { TouchableOpacity } from 'react-native';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import axios from "axios"
 import { base_url, base_url2 } from "./const"
 

 class Category extends Component{
 
   constructor(props){
     super(props);
     this.state={
       p_product:[]
     }
     this.category_name = this.props.route.params.cat_name
     this.cat_id = this.props.route.params.cat_id
    
   }


   getPopularProduct=()=>{
    axios({
      method: 'post',
      url: base_url2+'/getPopularProductByCategory/',
      headers: { "Content-Type": "text/plain" },
      data: ""+this.cat_id


    })
    .then(
      (response) => {
       
        axios({
          method: 'post',
          url: base_url+'/product/getProductArray',
          data: {
            product_id:response.data
          }
    
    
        })
        .then(
          (response) => {
         
          this.setState({p_product:response.data}) 
          
          
          }, (error) => {
          console.log(error);
          
          }
          );
      }, (error) => {
      console.log(error);
      
      }
      );
   }
 
   componentDidMount() {
    this.props.navigation.setOptions({
      title: this.category_name,
    })
    this.getPopularProduct()
    
  }
 
   render(){
     return (
         <View  style={styles.container}>
             <Button style={styles.button} title='Browse all>>' onPress={()=>{this.props.navigation.navigate('Browse',{cat_name:this.category_name,cat_id:this.cat_id})}}/>
             
             <SafeAreaView  style={styles.container}>
          
          <FlatList
             data={this.state.p_product}
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
             keyExtractor={(item) => item.asin}
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
  button:{
      marginTop:1
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
 
 export default Category;
 