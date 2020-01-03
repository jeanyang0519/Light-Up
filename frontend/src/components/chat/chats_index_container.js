import { connect } from "react-redux";
import ChatsIndex from "./chats_index";
import { fetchChats, fetchMessages, createNewMessage } from "../../actions/chat_actions";

const mapStateToProps = (state, ownProps) => {
      return {
        currentUser: state.session.currentUser,
        connections: state.session.currentUser.connections,
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
