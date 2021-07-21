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
 import { base_url } from "./const"
 
 const Drawer = createDrawerNavigator();

 class Home extends Component{
 
   constructor(){
     super();
     this.state={
       category: []
     }
     this.get_category();
   }


    get_category(){
      axios({
        method: 'get',
        url: base_url+'/product/getCategory',


    })
    .then(
      (response) => {
        this.setState({category:response.data})
        

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
       
         <SafeAreaView style={styles.container}>
         <FlatList
            data={this.state.category}
            renderItem={({ item }) => (
              <TouchableOpacity style={{flex:1}} onPress={()=>this.navigateCategory(item.category_id,item.category)}>              
                <Card containerStyle={styles.card} >
                <Card.Image source={{uri: item.url}}  />
                <Text style={{alignSelf: 'center',}}>{item.category}</Text>
              </Card>
              </TouchableOpacity>

            )}
      //Setting the number of column
            numColumns={2}
            keyExtractor={(item) => item.category_id}
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
 