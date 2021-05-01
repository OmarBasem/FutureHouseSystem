import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';


import {connect} from 'react-redux';
import {widthPercentageToDP as w, heightPercentageToDP as h} from 'react-native-responsive-screen';

// import {Back, Next} from '../../../components/index';
import {auth} from '../actions/index';

class NotificationsScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Notifications',
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
        <View style={s.emptyContainer}>
          <Icon name='notification' size={w('20%')} color='#19E57F'/>
          <Text style={s.emptyText}>You currently have no new Notifications!</Text>
        </View>
      </ScrollView>
    )
  }
}

const s = {
    emptyContainer: {
    width: w('90%'),
    height: h('35%', true),
    backgroundColor: 'whitesmoke',
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: w('2%'),
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: h('5%', true),
    padding: w('5%'),
    paddingTop: h('5%', true)
  },
  emptyText: {
    fontSize: w('4.5%'),
    marginTop: h('5%', true),
    textAlign: 'center',
    lineHeight: h('3.5%'),
    fontWeight: 'bold',
    color: 'grey'
  },
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, {...auth})(NotificationsScreen);