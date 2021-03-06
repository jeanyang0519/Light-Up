import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Profile from './profile';
import {
  fetchUser,
  requestConnection,
  acceptConnection,
  removeConnection,
  fetchCurrentUser
} from "../../actions/user_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    // errors: state.errors.session,
    currentUser: state.session.currentUser,
    profile: state.users[ownProps.match.params.id]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    fetchUser: (id) => dispatch(fetchUser(id)),
    fetchCurrentUser: (userId) => dispatch(fetchCurrentUser(userId)),
    requestConnection: (data) => dispatch(requestConnection(data)),
    acceptConnection: (data) => dispatch(acceptConnection(data)),
    removeConnection: (data) => dispatch(removeConnection(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);