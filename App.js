import React, { Component } from 'react';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
 
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import DrawerNav from './Component/DrawerNav';
import { main_color } from './Component/const';
import ChangePassword from './Component/ChangePassword';
import Phone from './Component/Phone';
import Address from './Component/Address';
import ManageProduct from './Component/ManageProduct';
import login from './Component/login';
import { connect } from 'react-redux';
import { LOGIN, LOGOUT } from './Component/action/type';
import Category from './Component/Category';
import Browse from './Component/Browse';
import Product from './Component/Product';
import {  Button } from 'react-native-elements'

 


const Stack = createStackNavigator();
class App extends Component{

  constructor(){
    super();
    this.state={
      isVisible:true,
      defaultScreen:true
    }
    this.getData()
    
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_id')
    
      if(value !== null) {
        this.setState({defaultScreen:false})
        this.props.login()
      }
    } catch(e) {
      // error reading value
      console.log(e)
    }
  }
  

  componentDidMount(){
    SplashScreen.hide();
  }
  

  render(){
    return (

        <NavigationContainer>
          <StatusBar backgroundColor={main_color}/>
              <Stack.Navigator  >
                        {!this.props.isLogin && <Stack.Screen  name="Login"  component={login}  options={{ headerShown: false }} /> }
                        <Stack.Screen  name="home"  component={DrawerNav}  options={{ headerShown: false }} /> 
                        <Stack.Screen  name="ChangePassword"  component={ChangePassword}  options={{ headerShown: true},{headerTintColor:main_color}} />
                        <Stack.Screen  name="ManagePhone"  component={Phone}  options={{ headerShown: true},{headerTintColor:main_color}} /> 
                        <Stack.Screen  name="ManageAddress"  component={Address}  options={{ headerShown: true},{headerTintColor:main_color}} /> 
                        <Stack.Screen  name="ManageProduct"  component={ManageProduct}  options={{ headerShown: true},{headerTintColor:main_color}} />
                        <Stack.Screen  name="Category"  component={Category}  options={{ headerShown: true},{headerTintColor:main_color}} />
                        <Stack.Screen  name="Browse"  component={Browse}  options={{ headerShown: true},{headerTintColor:main_color}} /> 
                        <Stack.Screen  name="Product"  component={Product}  options={{ headerShown: true},{headerTintColor:main_color},({navigation}) =>({headerRight:()=>(
                        <Button buttonStyle={{ backgroundColor: '#673AB7',marginEnd:10,width:50}} title="Cart" onPress={()=>navigation.navigate('Cart')} />)})} /> 
               </Stack.Navigator>  
      </NavigationContainer>

    );
  }
}

const styles = StyleSheet.create({
 container:{
   flex:1,
   justifyContent:'center',
   alignItems:'center'

 },

});
const mapStateToProps = state => ({
  isLogin: state.isLogin,
});

const mapDispatchToProps = dispatch => ({
  login: () => dispatch({ type: LOGIN })
});
export default connect(mapStateToProps, mapDispatchToProps)(App);