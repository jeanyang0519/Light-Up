import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGOUT,
  RECEIVE_USER_SIGN_IN
} from '../actions/session_actions';

const initialState = {
  isAuthenticated: false,
  currentUser: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        isAuthenticated: !!action.currentUser,
        currentUser: action.currentUser
      };
    case RECEIVE_USER_LOGOUT:
      return initialState;
    case RECEIVE_USER_SIGN_IN:
      return {
        ...state,
        isSignedIn: true
      }
    default:
      return state;
  }
}