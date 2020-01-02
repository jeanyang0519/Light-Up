import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';

import NavBar from './navbar';

const msp = state => {
  // debugger
  return ({

    loggedIn: state.session.isAuthenticated,
    // currentUser: state.users[state.session.id]
  })
};

const mdp = dispatch => ({
  logout: () => dispatch(logout()),
  openModal: modal => dispatch(openModal(modal))

});

export default (connect(msp, mdp)(NavBar));