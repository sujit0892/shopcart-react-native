import React, { Component } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  KeyboardAvoidingView,
  ToastAndroid,
  BackHandler

} from 'react-native';

import { Card, Button } from 'react-native-elements'
import { base_url } from "./const"
import {LOGIN,LOGOUT} from './action/type';
import { connect } from 'react-redux';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './home';
class Login extends Component {

  constructor() {
    super()
    this.state = {
      login: true,
      register: false,
      username: "",
      l_password: "",
      disable: false,
      email: "",
      r_password: "",
      c_password: "",
      name: "",
      phone: "",
      address: "",
      regist_disable: true,
    }
    this.registerClick = this.registerClick.bind(this);
    this.loginClick = this.loginClick.bind(this)
    this.login = this.login.bind(this)
    this.register = this.register.bind(this)
    this.handleBackButton = this.handleBackButton.bind(this)

  }

  storeData = async (value) => {
    try {
      await AsyncStorage.setItem('user_id', value)
    } catch (e) {
      // saving error
      console.log(e)
    }
  }



  registerClick() {
    this.setState({ login: false, register: true })
  }

  loginClick() {
    this.setState({ login: true, register: false })
  }

  login() {
    if (this.state.username == "" || this.state.l_password == "") {
      ToastAndroid.show("All field are required", ToastAndroid.SHORT);
      return;
    }
    this.setState({ disable: true })
    
    axios({
      method: 'post',
      url: base_url + '/user/login',
      data: {
        email: this.state.username,
        password: this.state.l_password
      }

    })
      .then(
        (response) => {
          
          if (response.data == "") {
            ToastAndroid.show("wrong username or password", ToastAndroid.SHORT);
            this.setState({ disable: false })
            return;
          }
          this.storeData(response.data);
          this.props.login()
          this.props.navigation.navigate("home");

        }, (error) => {
          console.log("hit")
          console.log('error', error);
          this.setState({ disable: false })
        }
      );


  }


  register() {
    if (this.state.email == "" || this.state.r_password == "" ||
      this.state.c_password == "" || this.state.name == "" || this.state.phone == "" || this.state.address == "") {
      ToastAndroid.show("All field are required", ToastAndroid.SHORT);
      return;
    }
    else if (this.state.r_password.length < 8) {
      ToastAndroid.show("Password must be 8 characters", ToastAndroid.SHORT);
      return;
    }
    else if (this.state.c_password != this.state.r_password) {
      ToastAndroid.show("Password didn't match", ToastAndroid.SHORT);
      return;
    }
    this.setState({ disable: true })
    axios({
      method: 'post',
      url: base_url + '/user/register',
      data: {
        email: this.state.email,
        password: this.state.r_password,
        name: this.state.name,
        phone: this.state.phone,
        address: this.state.address
      }

    })
      .then(
        (response) => {
         
          if (response.data == "") {
            ToastAndroid.show("Email Already exist", ToastAndroid.SHORT);
            this.setState({ disable: false })
            return
          }
          this.props.login()
          this.props.navigation.navigate("home");
          

        }, (error) => {
          console.log(error)
          this.setState({ disable: false })
        }
      );

  }

  componentDidMount(){
 
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)

   }
   handleBackButton(){
     BackHandler.exitApp()
   }

   componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }


  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>

        {this.state.login && <View style={styles.loginForm}>

          <Card containerStyle={styles.cards}>

            <Card.Title style={styles.cards_title}>LOGIN</Card.Title>
            <TextInput style={styles.field} value={this.state.username} placeholder="Username" keyboardType="email-address" onChangeText={(username) => this.setState({ username })} />

            <TextInput style={styles.field} value={this.state.l_password} placeholder="Password" secureTextEntry={true} onChangeText={(l_password) => this.setState({ l_password })} />
            <Button buttonStyle={{ backgroundColor: '#673AB7' }} disabled={this.state.disable} title="Login" onPress={this.login} />

          </Card>

        </View>}
        {this.state.register && <View style={styles.loginForm}><ScrollView contentContainerStyle={styles.ScrollView_content} style={styles.ScrollView}>
          <Card containerStyle={styles.cards}>
            <Card.Title style={styles.cards_title}>Signup</Card.Title>
            <TextInput style={styles.field} value={this.state.email} placeholder="Email" keyboardType="email-address" onChangeText={(email) => this.setState({ email })} />
            <TextInput style={styles.field} value={this.state.r_password} placeholder="Password" secureTextEntry={true} onChangeText={(r_password) => this.setState({ r_password })} />
            <TextInput style={styles.field} value={this.state.c_password} placeholder=" Confirm Password" secureTextEntry={true} onChangeText={(c_password) => this.setState({ c_password })} />
            <TextInput style={styles.field} value={this.state.name} placeholder="Name" onChangeText={(name) => this.setState({ name })} />
            <TextInput style={styles.field} value={this.state.phone} placeholder="Phone Number" keyboardType="number-pad" onChangeText={(phone) => this.setState({ phone })} />
            <TextInput style={styles.field} value={this.state.address} placeholder="Address" multiline={true} onChangeText={(address) => this.setState({ address })} />
            <Button buttonStyle={{ backgroundColor: '#673AB7' }} disabled={this.state.disable} title="Regisrer" onPress={this.register} />

          </Card>
        </ScrollView></View>}
        <View style={styles.button}>

          <Button buttonStyle={styles.login_button} title="Login" disabled={this.state.disable} onPress={this.loginClick} />
          <Button buttonStyle={styles.sign_button} titleStyle={{ color: "#673AB7", alignSelf: 'center' }} disabled={this.state.disable} title="Signup" onPress={this.registerClick} />

        </View>

      </KeyboardAvoidingView>);


  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginForm: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f0ebeb"

  },

  registerForm: {
    flex: 9,
    backgroundColor: "#f0ebeb"
  },
  ScrollView: {
    flex: 1,
    width: '100%'
  },
  ScrollView_content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  field: {
    backgroundColor: "#f0ebeb",
    marginBottom: 15,
    paddingLeft: 15,
    borderRadius: 5
  },
  cards: {
    padding: 20,
    width: "85%",
    borderRadius: 5
  },
  cards_title: {
    color: "#673AB7",
    fontWeight: "bold",
    fontSize: 25

  },
  button: {
    flex: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  login_button: {
    flex: 1,
    borderRadius: 0,
    backgroundColor: "#673AB7",
    width: "100%",
    alignContent: "center"
  },
  sign_button: {
    flex: 1,
    borderRadius: 0,
    backgroundColor: "#ffffff",
    width: "100%",


  }

});


const mapStateToProps = state => ({
});


const mapDispatchToProps = dispatch => ({
  login: () => dispatch({ type: LOGIN })
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)

