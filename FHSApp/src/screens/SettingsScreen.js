import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import {widthPercentageToDP as w, heightPercentageToDP as h} from 'react-native-responsive-screen';

// import {Back, Next} from '../../../components/index';
import {auth} from '../actions/index';

class SettingsScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Settings',
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
      <ScrollView>
        <TouchableOpacity style={s.item} activeOpacity={1}>
          <Text style={s.text}>Account Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.item} activeOpacity={1} onPress={() => this.props.logout(() => this.props.navigation.navigate('Login'))}>
          <Text style={s.text}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

const s = {
  item: {
    height: h('10%'),
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    justifyContent: 'center',

  },
  text: {
    paddingLeft: w('5%'),
    fontSize: w('4.5%'),
    fontWeight: 'bold'
  }
}

export default connect(mapStateToProps, {...auth})(SettingsScreen);