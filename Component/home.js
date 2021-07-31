/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Component } from 'react';
 import 'react-native-gesture-handler';

 import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
  BackHandler,FlatList,
  Image
 } from 'react-native';

 
 import { Card } from 'react-native-elements';
 import { color } from 'react-native-elements/dist/helpers';
 import { TouchableOpacity } from 'react-native';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import axios from "axios"
 import { base_url, base_url2 } from "./const"
 
 const Drawer = createDrawerNavigator();

 class Home extends Component{
 
   constructor(){
     super();
     this.state={
       user_id:"",
       r_product: [],
       p_product: []
     }
     this.getData()
     this.getPopularProduct()
   }
   getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_id')
      if (value !== null) {
        this.setState({user_id:value})
        this.getRecomendation()
      }

    } catch (e) {
      // error reading value
      console.log(e)
    }
  }

   getRecomendation = ()=>{
     if(this.state.user_id!="")
     {
      axios({
        method: 'post',
        url: base_url2+'/recomendation/',
        headers: { "Content-Type": "text/plain" },
        data: this.state.user_id
  
  
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
            this.setState({r_product:response.data}) 
            
            }, (error) => {
            console.log(error);
            
            }
            );
        
        }, (error) => {
        console.log(error);
        
        }
        );
     }

     

   }

   getPopularProduct=()=>
   {
    axios({
      method: 'get',
      url: base_url2+'/getPopularProduct',


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

    
 
   componentDidMount(){
    // console.log('this.props',this.props)
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)

   }
   
  //  handleBackButton(){
  //    BackHandler.exitApp()
  //  }

  //  componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  // }

   navigateCategory=(id,category)=>{
     this.props.navigation.navigate('Category',{cat_name:category,cat_id:id})
   }

   render(){
     return ( 
       
      <SafeAreaView  style={styles.container}>
          
      <FlatList
         data={[...this.state.r_product,...this.state.p_product]}
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
 
 export default Home;
 