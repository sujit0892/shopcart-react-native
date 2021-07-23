/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Component } from 'react';
 import 'react-native-gesture-handler';
 import {  CART,TOTAL_PRICE,CART_ID, ORDER } from './action/type';
 import { connect } from 'react-redux';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import axios from "axios"
 import { Card, Button, CheckBox } from 'react-native-elements'
 import { base_url, main_color } from "./const"
 
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   FlatList,
   TouchableOpacity,
   Image
 } from 'react-native';

 

 class Order extends Component{
 
   constructor(){
     super();
     this.state = {
       user_id:''
     }
   }
 
   getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_id')
      if (value !== null) {
          this.setState({user_id:value})
          this.getOrderData()
          
      }

    } catch (e) {
      // error reading value
      console.log(e)
    }
  }

  getOrderData=()=>{
    axios({
      method: 'get',
      url: base_url+'/order/'+this.state.user_id,


    })
    .then(
      (response) => {
          this.props.setOrder(response.data)

      
      }, (error) => {
      console.log(error);
    
      }
      );
  }


  
   componentDidMount(){
      this.getData();
   }
 
   render(){
     return (
         <View  style={styles.container}>
          <FlatList
            data={this.props.order}
            renderItem={({ item }) => (
              <TouchableOpacity key ={item.cart_id} style={{flex:1}} onPress={()=>{this.props.navigation.navigate('Product',{'product_id':item.product.asin})}} >              
                <Card containerStyle={styles.p_card} wrapperStyle={{flexDirection:"row"}}>
                  <View >
                  <Card.Image style={styles.imageThumbnail} source={{uri: item.product.images[0].url}}/>
                  </View>
                  <View style={{flexDirection:"column"}}>
                  <View style={{flexDirection:"row"}}>
                    <Text style={{fontSize:18, color:'#323232'}}>{item.product.name}</Text>
                    <Text style={{fontSize:18, color:'#323232',marginLeft:20}}>{item.product.rating}<Image source={require('./icon/star.png')}/></Text>
                    </View>
                  <View><Text style={{fontSize:18, color:'#323232'}}>${item.product.price}</Text></View>
                  <Card.Divider style={{width:300}}></Card.Divider>
                  <View style={{flexDirection:"column"}}>
                  <Text>Phone: {item.phone.phone}</Text>
                  <Text>Address: {item.address.address}</Text>
                  </View>

                  </View>

               
                </Card>
              </TouchableOpacity>

            )}
      //Setting the number of column
            numColumns={1}
            keyExtractor={(item) => item.cart_id}
         />

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
  p_card:{
    flexDirection:'row',
    margin:0,

  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,
    width:75

  },

  touch_op1:{
    // marginLeft:100,
   
    padding:5,
    backgroundColor:'white',
    borderRadius:5,
    width:100
  },
 
 });
 
 const mapStateToProps = state => ({

  order: state.order
});

const mapDispatchToProps = dispatch => ({

  setOrder: (data) => dispatch({type:ORDER, data:data})
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Order)
 