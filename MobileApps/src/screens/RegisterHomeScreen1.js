import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {widthPercentageToDP as w, heightPercentageToDP as h} from 'react-native-responsive-screen';

// import {Back, Next} from '../../../components/index';
import {auth} from '../actions/index';
import {Button} from "react-native-elements";

class RegisterHomeScreen1 extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Add Home',
  });

  constructor(props) {
    super(props);
    this.state = {
      cmu_id: ''
    }
  }

  componentDidMount() {

  }

  componentWillUnmount(): void {
  }


  render() {
    return (
      <View style={s.container}>
        <Text style={s.text}>Are you a Home Manager or a Home Dweller?</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterHome2', {manager: true})}>
        <Text style={s.option}>Home Manager</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterHome2', {manager: false})}>
        <Text style={[s.option, {paddingTop: h('5%')}]}>Home Dweller</Text>
        </TouchableOpacity>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'silver',
    fontWeight: 'bold',
    fontSize: w('4.5%'),
    bottom: h('5%'),
    width: w('80%'),
    textAlign: 'center'
  },
  option: {
    fontWeight: 'bold',
    fontSize: w('4.5%'),
  }

}

export default connect(mapStateToProps, {...auth})(RegisterHomeScreen1);