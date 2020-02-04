import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import {widthPercentageToDP as w, heightPercentageToDP as h} from 'react-native-responsive-screen';

// import {Back, Next} from '../../../components/index';
import {auth, houses} from '../actions/index';

class HomeScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Home',
    headerRight: <Text onPress={() => navigation.navigate('RegisterHome1')} style={{paddingRight: w('5%'), fontWeight: 'bold'}}>+ Add</Text>
  });

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.props.fetchHouses()
  }

  componentWillUnmount(): void {
  }


  render() {
    return (
      <View><Text>Home</Text></View>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, {...auth, ...houses})(HomeScreen);