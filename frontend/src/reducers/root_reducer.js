import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import users from './users_reducer';
import modalReducer from './modals_reducer';

const RootReducer = combineReducers({
  session,
  errors,
  users,
  modal: modalReducer
});

export default RootReducer;