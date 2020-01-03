import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';

import NavBar from './navbar';

const msp = state => {
  return ({

    loggedIn: state.session.isAuthenticated,
    currentUser: state.session.user,
    // currentUser: state.users[state.session.id]
  })
};

const mdp = dispatch => ({
  logout: () => dispatch(logout()),
  openModal: modal => dispatch(openModal(modal))

});

export default withRouter(connect(msp, mdp)(NavBar));