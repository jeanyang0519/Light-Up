import { RECEIVE_ALL_USERS, RECEIVE_SINGLE_USER } from '../actions/user_actions';

const initialState = {
  users: {}
};

export default function (state = initialState, action) {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_USERS:
      return Object.assign( {}, state, action.users);
    case RECEIVE_SINGLE_USER:
      return Object.assign({}, state, { [action.user.userId]: action.user });
    default:
      return state;
  }
}