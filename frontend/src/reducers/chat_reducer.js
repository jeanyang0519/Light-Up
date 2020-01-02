import {
  RECEIVE_CHATS
} from "../actions/chat_actions";

export default function(state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CHATS:
      const chats = {};
      Object.values(action.chats).map(chat => {
        chats[chat._id] = chat;
      });
      return Object.assign({}, state.chats, chats);
    default:
      return state;
  }
}
