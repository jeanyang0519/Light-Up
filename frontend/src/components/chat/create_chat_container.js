import { connect } from "react-redux";
import CreateChat from "./create_chat";
import { createChat } from "../../actions/chat_actions";

const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.errors.session,
        currentUser: state.session.currentUser,
        messages: Object.values(state.conversations.messages)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createChat: (userId, data) => dispatch(createChat(userId, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateChat);
