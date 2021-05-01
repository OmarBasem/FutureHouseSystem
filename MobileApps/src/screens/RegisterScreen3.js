import React, { Component } from "react";
import {connect} from 'react-redux';
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';
import {widthPercentageToDP as w, heightPercentageToDP as h} from 'react-native-responsive-screen';
import {auth} from '../actions/index';

class RegisterScreen3 extends Component {

    static navigationOptions = ({navigation}) => ({
    header: null
  });

    state = {
      email: '',
      password: '',
      username: ''
    };

    register = () => {
    if (this.state.email === '')
      Alert.alert(
        "Missing fields!",
        "Please, fill in the missing fields",
        [{text: 'Ok', style: 'cancel'}]
      )
    else if (this.state.password.length < 6)
      Alert.alert(
        "Password too short!",
        "Password must be at least 6 characters",
        [{text: 'Ok', style: 'cancel'}]
      )
    else
      this.props.register({...this.props.navigation.state.params, email: this.state.email, password: this.state.password,
      username: this.state.username}, () => {
        this.props.navigation.navigate('Home')
      })
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
           <TextInput onChangeText={username => this.setState({username})} placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
            <TextInput onChangeText={email => this.setState({email})} placeholder="Email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
            <TextInput onChangeText={password => this.setState({password})} placeholder="Password" secureTextEntry placeholderColor="#c4c3cb" style={styles.loginFormTextInput}/>
            <View style={styles.buttonsContainer}>


            <Button
              buttonStyle={[styles.nextButton, styles.backButton]}
              titleStyle={styles.title}
              onPress={() => this.props.navigation.navigate('Register1')}
              title="Back"
            />
             <Button
                buttonStyle={styles.nextButton}
                onPress={this.register}
                title="Register"
              />
            </View>
          </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  containerView: {
  flex: 1,

},
loginScreenContainer: {
  flex: 1,
      alignItems: 'center',
    justifyContent: 'center'
},
logoText: {
  fontSize: w('8%'),
  fontWeight: "800",
  marginTop: 150,
  marginBottom: h('8%', true),
  textAlign: 'center',
},
loginFormView: {
  flex: 1
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
  padding: w('2%')

},
nextButton: {
  backgroundColor: '#19E57F',
  borderRadius: 5,
  height: 45,
  marginTop: 10,
  width: w('40%')
},
  backButton: {
    backgroundColor: '#fff',
    borderColor: '#19e57f',
    borderWidth: 1,
  },
  title: {
        color: '#19e57f'
  },
  buttonsContainer: {
    flexDirection: 'row', width: w('100%'), justifyContent: 'space-around',
    marginTop: h('3%')
  }
};

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, {...auth})(RegisterScreen3);
