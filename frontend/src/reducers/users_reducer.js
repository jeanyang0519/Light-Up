import { RECEIVE_ALL_USERS, RECEIVE_SINGLE_USER } from '../actions/user_actions';

const initialState = {
  users: {}
};

export default function (state = initialState, action) {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_USERS:
      const users = {};
      Object.values(action.users).map(user => {users[user.id] = user});
      return Object.assign( {}, state.users, users);
    case RECEIVE_SINGLE_USER:
      return Object.assign({}, state.users, { [action.user.id]: action.user });
    default:
      return state;
  }
}