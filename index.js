/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux'
import configureStore from './Component/store'

const store = configureStore()
const ST = ()=>
    <Provider store={store}>
        <App/>
    </Provider>


AppRegistry.registerComponent(appName, () => ST);
