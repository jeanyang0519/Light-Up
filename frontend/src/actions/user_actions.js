import * as APIUtil from '../util/user_util';
import * as ConnectionUtil from '../util/connection_api';
import { receiveCurrentUser } from './session_actions';

export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS';
export const RECEIVE_SINGLE_USER = 'RECEIVE_SINGLE_USER';
export const RECEIVE_REQUEST = 'RECEIVE_REQUES';
export const ACCEPT_REQUEST = 'ACCEPT_REQUEST';

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});


export const receiveAllUsers = users => {
  return {
    type: RECEIVE_ALL_USERS,
    users
  };
};

export const receiveSingleUser = user => {
  return {
    type: RECEIVE_SINGLE_USER,
    user
  };
};

export const fetchUsers = users => dispatch => {
  return APIUtil.fetchUsers(users).then(res => {
    dispatch(receiveAllUsers(res.data));
  }, err => (
    dispatch(receiveErrors(err.response.data))
  ));
};

export const fetchUser = user => dispatch => {
  return APIUtil.fetchUser(user).then(res => {
    dispatch(receiveSingleUser(res.data));
  }, err => (
    dispatch(receiveErrors(err.response.data))
  ));
};

export const fetchCurrentUser = currentUser => dispatch => {
  return APIUtil.fetchCurrentUser(currentUser).then(res => {
    dispatch(receiveCurrentUser(res.data))
  }, err => (
    dispatch(receiveErrors(err.response.data))
  ));
}

export const update = (id, data) => dispatch => {
  return APIUtil.update(id, data).then(res => {
    dispatch(receiveSingleUser(res));
  },
    err => (
      dispatch(receiveErrors(err.response.data))
    ));
};

export const requestConnection = data => dispatch => {
  return ConnectionUtil.requestConnection(data).then(() => {
    dispatch(fetchCurrentUser(data.userId))
    dispatch(fetchUser(data.connectionId));
  }, err => {
    return dispatch(receiveErrors(err.response.data));
  });
};

export const acceptConnection = data => dispatch => {
  return ConnectionUtil.acceptConnection(data).then((data) => {
    dispatch(fetchCurrentUser(data.userId))
    dispatch(fetchUser(data.connectionId));
  }, err => {
    return dispatch(receiveErrors(err.response.data));
  });
};

export const removeConnection = data => dispatch => {
  return ConnectionUtil.removeConnection(data).then(() => {
    dispatch(fetchCurrentUser(data.userId))
    dispatch(fetchUser(data.connectionId));
  }, err => {
    return dispatch(receiveErrors(err.response.data));
  });
};