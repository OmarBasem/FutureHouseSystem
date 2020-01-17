import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";


// That's how you import actions. You need need to add it the connect function at the end of the file.
import {auth} from '../actions';

// That's how you import css in React. Create a separate CSS file for every screen.
// Also notice below how the css class is applied to the component.
import s from './css/SomeOtherClass.css';

class SomeOtherScreen extends Component {
  render() {
    return (
      <div>
        <div className={s.anotherClass}>Another screen. Notice how the web page did load, and that is one
        of the beauties of React!</div>
        <Link to='/'>
          <p>go back to home</p>
        </Link>
      </div>
    )
  }
}

// here you map redux state to the components props. You can then access user in the component using
// this.props.user
// Also note that, the component's state is different from the redux state

const mapStateToProps = state => {
  return {
    user: state.auth.user // if not logged in user will be null
  }
};


export default connect(mapStateToProps, {...auth})(SomeOtherScreen);