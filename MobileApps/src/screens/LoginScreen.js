import React, { Component } from "react";
import {connect} from 'react-redux';
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';
import {widthPercentageToDP as w, heightPercentageToDP as h} from 'react-native-responsive-screen';
import {auth} from '../actions/index';

class LoginScreen extends Component {

    static navigationOptions = ({navigation}) => ({
    header: null
  });

    state = {
      username: '',
      password: '',
      user: this.props.user
    };

    componentDidMount() {
      if (this.props.user)
        this.props.navigation.navigate('Home')
  }

  static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.user)
        return {user: nextProps.user}
      return null
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
      if (this.props.user)
        this.props.navigation.navigate('Home')
  }

  componentWillUnmount() {
  }

  onLoginPress() {
      if (this.state.username === '')
        Alert.alert(
          'Username missing!',
          'Please, enter your username',
          [{text: 'Ok!', style: "cancel"}]
        );
    else if (this.state.password.length < 6)
      Alert.alert(
          'Password too short!',
          'Password is at least 6 characters',
          [{text: 'Ok!', style: "cancel"}]
        )
    else this.props.login(this.state.username, this.state.password)
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>Future House System</Text>
            <TextInput onChangeText={username => this.setState({username})} placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
            <TextInput onChangeText={password => this.setState({password})} placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true}/>
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.onLoginPress()}
              title="Login"
            />
            <Button
              buttonStyle={[styles.loginButton, styles.registerButton]}
              titleStyle={styles.title}
              onPress={() => this.props.navigation.navigate('Register1')}
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
loginButton: {
  backgroundColor: '#19E57F',
  borderRadius: 5,
  height: 45,
  marginTop: 10,
  width: w('90%')
},
  registerButton: {
    backgroundColor: '#fff',
    borderColor: '#19e57f',
    borderWidth: 1,
    marginTop: h('5%')
  },
  title: {
        color: '#19e57f'
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, {...auth})(LoginScreen);
