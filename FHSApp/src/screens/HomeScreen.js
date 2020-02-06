import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {widthPercentageToDP as w, heightPercentageToDP as h} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import FastImage from 'react-native-fast-image';

// import {Back, Next} from '../../../components/index';
import {auth, houses} from '../actions/index';

class HomeScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Home',
    headerRight: <Text onPress={() => navigation.navigate('RegisterHome1')}
                       style={{paddingRight: w('5%'), fontWeight: 'bold'}}>+ Add</Text>
  });

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchHouses()
  }

  componentWillUnmount(): void {
  }

  renderItem = item => {
    const house = item.item;
    return (
      <View style={s.container}>
        <View style={{flexDirection: 'row'}}>
        <Text style={s.name}>{house.name}</Text>
        {house.manager.id === this.props.user.id && <Icon name='tie' size={w('5%')} style={{top: h('0.5%')}}/>}
        </View>
        <FastImage style={s.image}
                   source={{uri: house.cover_photo ? house.cover_photo.uri : 'https://www.myplace.direct/sites/default/files/styles/large/public/property-1.jpg?itok=cCdlSIQJ'}}/>
        <View style={{width: w('100%')}}>
          <View style={{flexDirection: 'row', marginTop: h('2%'), justifyContent: 'space-around'}}>
            <View style={[s.circle, {borderColor: 'blue'}]}>
              <Text style={s.statText}>{house.last24hr.generated} kW{'\n'} generated</Text>
            </View>
            <View style={[s.circle, {borderColor: 'orange'}]}>
              <Text style={s.statText}>{house.last24hr.consumed} kW{'\n'} consumed</Text>
            </View>
          </View>
           <View style={{flexDirection: 'row', marginTop: h('2%'), justifyContent: 'space-around'}}>
           <View style={[s.circle, {borderColor: 'red'}]}>
             <Text style={s.statText}>{house.last24hr.wasted} kW{'\n'} wasted</Text>
           </View>
            <View style={[s.circle, {borderColor: 'green'}]}>
              <Text style={s.statText}>{house.last24hr.saved} kW{'\n'} saved</Text>
            </View>
          </View>
        </View>
      </View>

    )
  }


  render() {
    return (
      <FlatList
        data={Object.values(this.props.houses)}
        renderItem={this.renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={s.content}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    houses: state.houses
  }

}

const s = {
  container: {
    marginTop: h('3%'),
    alignItems: 'center'
  },
  image: {
    width: w('80%'),
    height: w('50%')
  },
  content: {
    alignItems: 'center',
    paddingTop: h('2%')
  },
  name: {
    fontSize: w('5%'),
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: h('3%')
  },
  circle: {
    width: w('30%'),
    height: w('30%'),
    borderRadius: w('30%'),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  statText: {
    fontWeight: 'bold',
    textAlign: 'center'
  }
}

export default connect(mapStateToProps, {...auth, ...houses})(HomeScreen);