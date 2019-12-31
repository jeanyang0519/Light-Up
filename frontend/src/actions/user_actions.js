import * as APIUtil from '../util/user_util';

export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS';
export const RECEIVE_SINGLE_USER = 'RECEIVE_SINGLE_USER';

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
    dispatch(receiveAllUsers(res));
  }, err => (
    dispatch(receiveErrors(err.response.data))
  ));
};

export const fetchUser = user => dispatch => {
  return APIUtil.fetchUser(user).then(res => {
    dispatch(receiveSingleUser(res));
  }, err => (
    dispatch(receiveErrors(err.response.data))
  ));
};