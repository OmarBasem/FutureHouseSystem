// In this file, I have given you examples of how to write actions. The main authentication functions are below.

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import {URL} from './URL';

// call this function to fetch the user's data. Can be called on page refresh
export function loadUser() {
  return async function (dispatch) {
    const token = await AsyncStorage.getItem('@token');
    const config = {headers: {"Authorization": `Token ${token}`}};
    axios.get(`${URL}/api/auth-user/`, config)
      .then(async response => {
        dispatch({type: 'USER_LOADED', payload: response.data.user});
      }).catch(err => {
      console.log('erroe', err.response.data)
    })
  }
}


// login function
export function login(username, password) {
  return function (dispatch) {
    axios.post(`${URL}/api/login/`, {username, password})
      .then(response => {
        dispatch({type: 'LOGIN_SUCCESSFUL', payload: response.data });
        dispatch({type: 'CLEAR_ERRORS'})
      }).catch( error => {
       dispatch({type: "LOGIN_ERROR", payload: error.response.data});
    })
  }
}

// register function
export function register (params, callback) {
  return function (dispatch) {
    const {firstName, lastName, email, password, age, username} = params;
    const name = firstName + ' ' + lastName;
    console.log('calling ressss', name, age, email, password)
    dispatch({type: 'START_LOADING'});
    axios.post(`${URL}/api/register/`, {name, age, email, password, username})
      .then(response => {
        console.log('resssss', response)
        dispatch({type: 'REGISTRATION_SUCCESSFUL', payload: response.data });
        callback()
      }).catch( error => {
        console.log('ERRR', error.response)
       dispatch({type: "REGISTER_ERROR", payload: error.response.data});
    })
  }
}


// Logout function. It needs a callback function parameter to navigate to the login screen after logout.
export function logout(callback) {
  return async function (dispatch) {
        const token = await AsyncStorage.getItem('@token');
    const config = {headers: {"Authorization": `Token ${token}`}};
    axios.post(`${URL}/api/auth/logout/`, {}, config)
      .then( () => {
        dispatch({type: 'LOGOUT_SUCCESSFUL'});
        if (callback !== undefined){
          callback()
        }
      }).catch( response => {
       dispatch({type: 'LOGOUT_SUCCESSFUL'});
       if (callback !== undefined){
          callback()
        }
    })
  }
}

export function test() {
  return function (dispatch) {
      axios.get('/api/test/', {}).then(response => {
    console.log('RESPONSE: ', response.data)
  }).catch(error => console.log('ERROR: ', error))
  }
}