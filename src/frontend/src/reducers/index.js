// All the reducers form redux needs to be combined in order to be used in react components. This is what this file does.
// when you create a new reducer, you need to import it here and add to the the combineReducers() function.

import {combineReducers} from 'redux';

import auth from './auth'



export default combineReducers({
  auth
});