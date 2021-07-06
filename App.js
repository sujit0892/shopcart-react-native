/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';

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



class App extends Component{

  constructor(){
    super();
    this.state={
      isVisible:true,
    }
  }

  componentDidMount(){
    SplashScreen.hide();
  }

  render(){
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#8949D8"/>
        <Text>Hello WOrld</Text>
      </View>
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

export default App;
