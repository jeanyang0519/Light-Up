import {
  RECEIVE_CHATS
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
    default:   
      return state;
  }
}
