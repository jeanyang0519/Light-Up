import { connect } from 'react-redux';
import LogoutOption from './logout_option';
import { logout } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';

// const msp = (state) => ({
//     currentUser: state.entities.users[state.session.id],
// });

const mdp = dispatch => ({
    logout: () => dispatch(logout()),
    closeModal: () => dispatch(closeModal())
});

export default withRouter(connect(null, mdp)(LogoutOption));