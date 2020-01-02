import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import users from './users_reducer';
import conversations from './conversations_reducer';

const RootReducer = combineReducers({
  session,
  errors,
  users,
  conversations
});

export default RootReducer;