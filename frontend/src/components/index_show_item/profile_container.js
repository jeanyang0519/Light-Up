import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Profile from './profile';
import { fetchUser, requestConnection } from '../../actions/user_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    // errors: state.errors.session,
    currentUser: state.session.user,
    profile: state.users[ownProps.match.params.id]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    fetchUser: (id) => dispatch(fetchUser(id)),
    requestConnection: (data) => dispatch(requestConnection(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);