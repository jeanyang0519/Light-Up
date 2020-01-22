import {
  RECEIVE_CHATS,
  RECEIVE_CHAT
} from "../actions/chat_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CHATS:
      const chats = {};
      action.chats.map(chat => {
        chats[chat._id] = chat;
      });
      return chats;
    case RECEIVE_CHAT:
      return Object.assign({}, state, { [action.chat._id]: action.chat})
    default:   
      return state;
  }
}
