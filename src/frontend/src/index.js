// This is the index file, the entry point to the react bundle. All screens needs to be imported here and added
// in the Render() function as a <Route/> component

import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import {Provider, connect} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import reduxThunk from "redux-thunk";

import reducers from './reducers';
import App from './screens/App';
import Home from './screens/Home';
import SomeOtherScreen from './screens/SomeOtherScreen';
import NotFound from './screens/NotFound';

  const store = createStore(
    reducers,
  applyMiddleware(reduxThunk)
);

class RootContainerComponent extends Component {




  render() {
    return (
      <BrowserRouter >
          <App>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/another-screen" component={SomeOtherScreen}/>
                <Route component={NotFound}/>
              </Switch>
          </App>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {

}

const mapDispatchToProps = dispatch => {

}

let RootContainer = connect(null, null)(RootContainerComponent);

ReactDOM.render(
  <Provider store={store}>
    <RootContainer/>
  </Provider>,
  document.getElementById('root')
);



