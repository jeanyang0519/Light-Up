import { connect } from 'react-redux';
import { update } from '../../actions/user_actions';
import EditProfile from './edit_profile';

const mapStateToProps = (state, ownProps) => {
  return {
    // errors: state.errors.session,
    currentUser: state.session.currentUser,
    profile: state.users[ownProps.match.params.id]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (id, data) => dispatch(update(id, data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);