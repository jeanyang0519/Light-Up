import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Index from './index';
import { fetchUsers, fetchUser } from '../../actions/user_actions';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    currentUser: state.session.currentUser,
    users: Object.values(state.users),
    connections: Object.values(state.session.currentUser.connections)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchUser: (id) => dispatch(fetchUser(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);