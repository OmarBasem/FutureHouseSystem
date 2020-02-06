import _ from 'lodash';

export default function (state = {}, action) {
  switch (action.type) {

    case 'FETCH_HOUSES':
      return {...state, ..._.mapKeys(action.payload, 'id')};

    case 'CLEAR_HOUSES':
      return {};

    default:
      return state;
  }
}