/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Component } from 'react';
 import 'react-native-gesture-handler';
 import axios from "axios"
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { Card, Button, CheckBox } from 'react-native-elements'

 import { base_url, main_color } from "./const"
 import { SliderBox } from "react-native-image-slider-box";
 import Unorderedlist from 'react-native-unordered-list';
 import { KeyboardAvoidingView } from 'react-native';

 import {  CART,TOTAL_PRICE,CART_ID, ORDER } from './action/type';
 import { connect } from 'react-redux';
 
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   ToastAndroid,
   FlatList,
   TouchableOpacity,
   Image

 } from 'react-native';
 import {Picker} from '@react-native-picker/picker';
import Order from './order';
 

 class Cart extends Component{
 
   constructor(){
     super();
     this.state = {
       cart_data:[],
       user_id:'',
       total_price:'',
       cart_id:[],
       address_data:[],
       phone_data:[],
       default_address:{},
       default_phone:{}
     }
     this.getData();
    
   }
 
   getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_id')
      if (value !== null) {
          this.setState({user_id:value})
          this.getCartData()
          this.getAddressData()
          this.getPhoneData()
      }

    } catch (e) {
      // error reading value
      console.log(e)
    }
  }

    getCartData=()=>{
      axios({
        method: 'get',
        url: base_url+'/cart/'+this.state.user_id,
  
  
      })
      .then(
        (response) => {
            let price = 0;
            let carts =[]
            for(let i = 0;i<response.data.length;i++)
            {
              carts.push(response.data[i].cart_id)
              price += response.data[i].product.price
            }  
            this.setState({cart_id:carts,total_price:price,cart_data:response.data})
            this.props.setCartData(response.data)
            this.props.setCartId(carts)
            this.props.setTotalPrice(price)
  
        
        }, (error) => {
        console.log(error);
      
        }
        );
    }

    


     getAddressData=()=>{
      axios({
        method: 'post',
        url: base_url+'/user/getAddress',
        headers: { "Content-Type": "text/plain" },
        data: this.state.user_id
  
    })
    .then(
      (response) => {
        this.setState({address_data:response.data})
        for(i=0;i<response.data.length;i++)
        {
            if(response.data[i].default)
            {
                this.setState({default_address:response.data[i].address_id})
            }
        }
  
      }, (error) => {
      console.log(error);
   
      }
      );
     }

     getPhoneData=()=>{
      axios({
        method: 'post',
        url: base_url+'/user/getPhone',
        headers: { "Content-Type": "text/plain" },
        data: this.state.user_id
  
    })
    .then(
      (response) => {
        this.setState({phone_data:response.data})
        for(i=0;i<response.data.length;i++)
        {
            if(response.data[i].default)
            {
                this.setState({default_phone:response.data[i].phone_id})
            }
        }
  
      }, (error) => {
      console.log(error);
   
      }
      );
     }


    removeProduct=(cart_id)=>{
      axios({
        method: 'post',
        url: base_url+'/cart/removeFromCart',
        headers: { "Content-Type": "text/plain" },
        data: ""+cart_id
  
    })
    .then(
      (response) => {
        this.getCartData()
  
      }, (error) => {
      console.log(error);
   
      }
      );
    }

    placeOrder = ()=>{
      axios({
        method: 'post',
        url: base_url+'/order/placeOrder',
        data: {
          cart_id:this.props.cart_id,
          user_id : this.state.user_id,
          address_id:this.state.default_address,
          phone_id:this.state.default_phone

        }
  
    })
    .then(
      (response) => {
        this.props.setOrder(response.data)
        this.getCartData()
        this.props.navigation.navigate('Order')

  
      }, (error) => {
      console.log(error);
   
      }
      );
    }

   componentDidMount(){
    this.getCartData()
    this.getAddressData()
    this.getPhoneData()
   }

   componentDidUpdate(){
    //  console.log('HIIII')
   }
 
   render(){
     return (
         <View  style={styles.container}>
           
           <Card containerStyle={styles.card}>
             <Text style={{fontSize:18, color:'#323232'}}>Total Price: ${this.props.total_price}</Text>
             <Card.Divider></Card.Divider>
             <Text>Select Address</Text>
             <Picker style={{backgroundColor:"#f0ebeb"}}
            selectedValue={this.state.default_address}
            onValueChange={(itemValue, itemIndex) =>
             { this.setState({default_address:itemValue,})
              
                } } >
            {this.state.address_data.map((data)=>{
                return (<Picker.Item  key={data.address_id} label={data.address} value={data.address_id}/>)
            })}

            
            </Picker>

            <Text>Select Phone</Text>
             <Picker style={{backgroundColor:"#f0ebeb"}}
            selectedValue={this.state.default_phone}
            onValueChange={(itemValue, itemIndex) =>
             { this.setState({default_phone:itemValue,})
                
                } } >
            {this.state.phone_data.map((data)=>{
                return (<Picker.Item  key={data.phone_id} label={data.phone} value={data.phone_id}/>)
            })}

            
            </Picker>

           </Card>
           <FlatList
            data={this.props.cart_data}
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
                  <View style={{flexDirection:"row-reverse",alignItems:'center'}}>
                  <Button title="Remove" buttonStyle={styles.touch_op1} titleStyle={{color:main_color}} onPress={()=>this.removeProduct(item.cart_id)}/>
                  </View>
                  </View>

               
                </Card>
              </TouchableOpacity>

            )}
      //Setting the number of column
            numColumns={1}
            keyExtractor={(item) => item.cart_id}
         />
         <Button title="Buy Now" onPress={this.placeOrder} />
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
  cart_data: state.cart,
  cart_id : state.cart_id,
  total_price : state.total_price,
  order: state.order
});

const mapDispatchToProps = dispatch => ({
  setCartData: (data) => dispatch({ type: CART, data: data}),
  setTotalPrice: (data) => dispatch({type:TOTAL_PRICE, data:data}),
  setCartId: (data) => dispatch({type:CART_ID, data:data}),
  setOrder: (data) => dispatch({type:ORDER, data:data})
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
  