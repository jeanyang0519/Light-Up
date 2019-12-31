import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Index from './index';
import { fetchUsers, fetchUser } from '../../actions/user_actions';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    currentUser: state.user,
    users: state.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    fetchUsers: () => dispatch(fetchUsers),
    fetchUser: (id) => dispatch(fetchUser(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);