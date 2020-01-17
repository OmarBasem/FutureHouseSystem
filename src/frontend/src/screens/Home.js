import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';

// That's how you import actions. You need need to add it the connect function at the end of the file.
import {auth} from '../actions';

// That's how you import css in React. Create a separate CSS file for every screen.
// Also notice below how the css class is applied to the component.
import s from './css/Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <div className={s.someClass}>HOME!</div>
        <Link to='/another-screen'>
          <p>go to another screen</p>
        </Link>
        <p>Click the button below 'click me' to test connection to the backend server, and check your browser's console. If success: true prints in
        the console, then the request has succeeded. Also check the window of the running server in the command line
        to make sure your request has reached the backend.</p>
        <a onClick={() => this.props.test()} style={{cursor: 'pointer'}}>click me</a>
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


export default connect(mapStateToProps, {...auth})(Home);