import { connect } from "react-redux";
import ChatsIndex from "./chats_index";
import { fetchChats, fetchMessages, createNewMessage } from "../../actions/chat_actions";
import { selectUserChats } from "../../util/selectors";

const mapStateToProps = (state, ownProps) => {
      return {
        user: state.session.user,
        connections: state.session.user.connections,
        chats: Object.values(state.conversations.chats),
        messages: Object.values(state.conversations.messages)
      };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChats: (userId) => dispatch(fetchChats(userId)),
    fetchMessages: (chatId) => dispatch(fetchMessages(chatId)),
    createNewMessage: (userId, data) => dispatch(createNewMessage(userId, data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatsIndex);
