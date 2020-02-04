import React, {Component} from 'react';
import {Text, View, TextInput, Alert} from 'react-native';
import {connect} from 'react-redux';
import {widthPercentageToDP as w, heightPercentageToDP as h} from 'react-native-responsive-screen';

// import {Back, Next} from '../../../components/index';
import {auth, houses} from '../actions/index';
import {Button} from "react-native-elements";

class RegisterHomeScreen2 extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Add Home',
  });

  constructor(props) {
    super(props);
    this.state = {
      cmu_id: '',
      name: ''
    }
  }

  componentDidMount() {

  }

  componentWillUnmount(): void {
  }


  add = () => {
    if (this.state.cmu_id === '' || this.state.name === '')
      Alert.alert("Missing fields", "Please, fill in the missing fields")
    else
      this.props.addHouse(this.state.cmu_id, this.state.name, () => this.props.navigation.navigate('Home'))
  }
  render() {
    return (
      <View style={s.container}>
        <Text style={s.text}>Enter below the ID on your Central Monitoring Unit</Text>
        <TextInput onChangeText={cmu_id => this.setState({cmu_id})} placeholder="CMU ID"
                   placeholderColor="#c4c3cb" style={s.loginFormTextInput}/>
        <TextInput onChangeText={name => this.setState({name})} placeholder="Give your house a name"
                   placeholderColor="#c4c3cb" style={s.loginFormTextInput}/>
                            <Button
              buttonStyle={s.nextButton}
              onPress={this.add}
              title="Add"
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    marginTop: 5,
    marginBottom: 5,
    width: w('90%'),
    padding: w('2%'),

  },
  text: {
    color: 'silver',
    fontWeight: 'bold',
    fontSize: w('4.5%'),
    bottom: h('5%'),
    width: w('80%'),
    textAlign: 'center'
  },nextButton: {
  backgroundColor: '#19E57F',
  borderRadius: 5,
  height: 45,
  marginTop: 10,
  width: w('90%'),
    marginBottom: h('10%')
},

}

export default connect(mapStateToProps, {...auth, ...houses})(RegisterHomeScreen2);