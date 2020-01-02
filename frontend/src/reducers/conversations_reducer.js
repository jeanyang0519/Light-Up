import { combineReducers } from "redux";
import chats from "./chat_reducer";
import messages from "./messages_reducer";

const ConversationsReducer = combineReducers({
  chats,
  messages
});

export default ConversationsReducer;
