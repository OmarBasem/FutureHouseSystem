// The App container component for the <Route/> components inside index.js

import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

// import s from './style.css'


class App extends Component {
  render() {
    const {children} = this.props;
    return (
      <div>
      <div >{children}</div>
      </div>
    )
  }
}


export default withRouter(connect(null, null)(App));