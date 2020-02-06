import React, {Component} from 'react';
import {Text, View} from 'react-native';
import FastImage from "react-native-fast-image";

import {connect} from 'react-redux';
import {widthPercentageToDP as w, heightPercentageToDP as h} from 'react-native-responsive-screen';

// import {Back, Next} from '../../../components/index';
import {auth} from '../actions/index';
import {Button} from "react-native-elements";

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
      <View style={s.container}>
        <FastImage source={{uri: 'https://internetofbusiness.com/wp-content/uploads/2018/07/iot-3337536_960_720-640x441.png'}}
        style={{width: w('80%'), height: w('60%')}}/>
        <Text style={s.text}>Get all your IoT devices connected and controll them through the App.</Text>
          <Button
              buttonStyle={s.loginButton}
              title="Add IoT"
            />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

const s = {
  container: {
      alignItems: 'center',
  width: w('100%'),
    height: h('100%', true),
    marginTop: h('10%')
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: w('4.5%'),
    width: w('80%'),
    marginTop: h('5%')
  },
  loginButton: {
  backgroundColor: '#19E57F',
  borderRadius: 5,
  height: 45,
  marginTop: h('5%'),
  width: w('50%')
},

}

export default connect(mapStateToProps, {...auth})(IoTScreen);