import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {connect} from 'react-redux';
import {widthPercentageToDP as w, heightPercentageToDP as h} from 'react-native-responsive-screen';

// import {Back, Next} from '../../../components/index';
import {auth} from '../actions/index';

class ProfileScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Home',
  });

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {

  }

  componentWillUnmount(): void {
  }


  render() {
    return (
      <View><Text>profile</Text></View>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, {...auth})(ProfileScreen);