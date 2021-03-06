import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';
import io from 'socket.io-client';
import { fetchChats, createNewMessage } from './actions/chat_actions';
import { fetchCurrentUser } from './actions/user_actions';


document.addEventListener('DOMContentLoaded', () => {
  let store;

  if (localStorage.jwtToken) {

    store = configureStore({})
    setAuthToken(localStorage.jwtToken);

    const decodedUser = jwt_decode(localStorage.jwtToken);
    
    const preloadedState = { session: { isAuthenticated: true, currentUser: decodedUser } };
    
    store = configureStore(preloadedState);
    store.dispatch(fetchCurrentUser(decodedUser.id))

    const currentTime = Date.now() / 3000;

    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/';
    }
  } else {
    store = configureStore({});
  }
  const root = document.getElementById('root');

  ReactDOM.render(<Root store={store} />, root);

});