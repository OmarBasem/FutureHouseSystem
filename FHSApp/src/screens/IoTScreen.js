import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {connect} from 'react-redux';
import {widthPercentageToDP as w, heightPercentageToDP as h} from 'react-native-responsive-screen';

// import {Back, Next} from '../../../components/index';
import {auth} from '../actions/index';

class IoTScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'IoT',
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
      <View><Text>iot</Text></View>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, {...auth})(IoTScreen);