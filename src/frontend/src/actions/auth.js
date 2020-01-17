// In this file, I have given you examples of how to write actions. The main authentication functions are below.

import axios from 'axios';

// call this function to fetch the user's data. Can be called on page refresh
export function loadUser() {
  return async function (dispatch) {
    let config = {headers: {"Authorization": `Token ${localStorage.token}`}};
    axios.get(`/api/auth-user/`, config)
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
    axios.post('/api/login/', {username, password})
      .then(response => {
        dispatch({type: 'LOGIN_SUCCESSFUL', payload: response.data });
        dispatch({type: 'CLEAR_ERRORS'})
      }).catch( error => {
       dispatch({type: "LOGIN_ERROR", payload: error.response.data});
    })
  }
}

// register function
export function register (name, username, email, password, birth_date) {
  return function (dispatch) {
    dispatch({type: 'START_LOADING'});
    axios.post('/api/register/', {name, username, email, password, birth_date})
      .then(response => {
        dispatch({type: 'REGISTRATION_SUCCESSFUL', payload: response.data });
        dispatch({type: 'CLEAR_ERRORS'});
        dispatch({type: 'END_LOADING'});
      }).catch( error => {
       dispatch({type: "REGISTER_ERROR", payload: error.response.data});
       dispatch({type: 'END_LOADING'});
    })
  }
}


// Logout function. It needs a callback function parameter to navigate to the login screen after logout.
export function logout(callback) {
  return function (dispatch) {
        let config = {headers: {"Authorization": `Token ${localStorage.token}`}};
    axios.post('/api/auth/logout/', {}, config)
      .then( () => {
        dispatch({type: 'LOGOUT_SUCCESSFUL'});
        if (callback !== undefined){
          callback()
        }
      }).catch( response => {
       dispatch({type: "AUTHENTICATION_ERROR", payload: response.data});
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