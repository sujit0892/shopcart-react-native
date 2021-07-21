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
   View,Image, TextInput,
   ToastAndroid

 } from 'react-native';

 import axios from "axios"
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { Card, Button, CheckBox } from 'react-native-elements'

 import { base_url, main_color } from "./const"
 import { SliderBox } from "react-native-image-slider-box";
 import Unorderedlist from 'react-native-unordered-list';
 import { Rating, AirbnbRating } from 'react-native-ratings';
import { KeyboardAvoidingView } from 'react-native';

 class Product extends Component{
 
   constructor(props){
     super(props);
     this.state={
       prod_data:{},
       images:[],
       description:[],
       feature:[],
       rating:'2.5',
       review:'',
       userId:'',
       review_data:[],
       ready:false,
     }
     this.prod_id = this.props.route.params.product_id
     this.getProduct()
     this.getData()
   }
 
   componentDidMount(){
    this.props.navigation.setOptions({
      title: ' ',
    })
    
   }


   getProduct=()=>{
    axios({
      method: 'get',
      url: base_url+'/product/'+this.prod_id,


    })
    .then(
      (response) => {
        this.setState({prod_data:response.data})
        let images_a = []
        for(let i=0;i<response.data['images'].length;i++)
          images_a.push(response.data['images'][i]['url'])
        this.setState({images:images_a})
        this.setState({description:response.data['description'].split('</>')})
        this.setState({feature:response.data['feature'].split(',')})
        this.setState({review_data:response.data['reviews'],ready:true})
        

      
      }, (error) => {
      console.log(error);
      ToastAndroid.show("Network error",ToastAndroid.SHORT)
      }
      );
   }





   getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_id')
      if (value !== null) {
          this.setState({userId:value})
      }

    } catch (e) {
      // error reading value
      console.log(e)
    }
  }

   ratingCompleted=(ratings)=>{
    this.setState({rating:ratings})
  }

  add_review=()=>{

      axios({
        method: 'post',
        url: base_url + '/product/addReview',
        data: {
            user_id:this.state.userId,
            product_id:this.prod_id,
            review:this.state.review,
            rating:this.state.rating
            
        }
  
      })
        .then(
          (response) => {
            
            ToastAndroid.show("Reviwed successfully",ToastAndroid.SHORT)            
            this.getProduct()
        
          }, (error) => {
            console.log('error', error);
            ToastAndroid.show("Internal error",ToastAndroid.SHORT)
            
          }
        );
    
   }
 
   render(){
     return (
         <View  style={styles.container}>
          <ScrollView >
              <SliderBox images={this.state.images} sliderBoxHeight={500}/>
              <Card containerStyle={styles.card}>
              <View style={{flexDirection:'row',marginTop:5}}>
              <Text style={{fontSize:18, color:'#323232'}}>{this.state.prod_data.name}</Text>
              <View style={{flexDirection:'row',marginRight:0}}>
              <Text style={{fontSize:18, color:'#323232',marginHorizontal:10}}>{this.state.prod_data.rating}<Image source={require('./icon/star.png')}/></Text></View>
              </View>
              <Text style={{fontSize:20,fontWeight:'bold', color:'#323232',marginTop:5}}>${this.state.prod_data.price}</Text>
              </Card>
              <Card containerStyle={styles.card}>
              <Text style={{fontSize:18,fontWeight:'bold', color:'#323232'}}>Product Details</Text>
              <Text style={{fontSize:18, color:'#323232'}}>Description</Text>
              {this.state.description.map((data)=>{
                return <View key={data}><Unorderedlist><Text>{data}</Text></Unorderedlist></View>
              })}
              <Text style={{fontSize:18, color:'#323232'}}>Feature</Text>
              {this.state.feature.map((data)=>{
                return <View key={data}><Unorderedlist><Text>{data}</Text></Unorderedlist></View>
              })}
              
              </Card>
              <KeyboardAvoidingView>
              <Card containerStyle={styles.review_cart}>
              <Card.Title>Add Review</Card.Title>
              <Rating
                showRating
                onFinishRating={this.ratingCompleted}
                style={{ paddingVertical: 10 }}
                />
              <TextInput style={styles.field} value={this.state.review} placeholder="Review" multiline={true} onChangeText={(review) => this.setState({ review })} />
              <Button buttonStyle={{ backgroundColor: '#673AB7' }}  title="Review" onPress={this.add_review} />

              </Card></KeyboardAvoidingView>
              
              {this.state.ready && this.state.review_data.map((data)=>{
                return (<Card containerStyle={styles.card}>
                  <View style={{flexDirection:'row'}}>
                  <Text style={{fontWeight:'bold', color:'#323232'}}>{data.user.name}</Text>
                  <Text style={{fontWeight:'bold',color:'#323232',marginHorizontal:10}}>{data.rating}<Image source={require('./icon/star.png')}/></Text>
                  </View>
                  <Text>{data.review}</Text>
                  
                </Card>)
              })}
              
          </ScrollView>
              
           </View>
     );
   }
 }
 
 const styles = StyleSheet.create({
  container:{
    flex:1,
 
  },
  card:{
    flexDirection:'column',
    margin:0,
    

    
  },
  review_cart:{
    flexDirection:'column',
    margin:0,
       
  },
  field: {
    backgroundColor: "#f0ebeb",
    marginBottom: 15,
    paddingLeft: 15,
    borderRadius: 5
  },
 
 });
 
 export default Product;
 