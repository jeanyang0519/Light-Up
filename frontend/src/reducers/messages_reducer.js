import {
  RECEIVE_MESSAGE,
  RECEIVE_MESSAGES,
  REMOVE_CHAT
} from "../actions/chat_actions";

export default function(state = {}, action) {
  Object.freeze(state);
    let messages = {};
  switch (action.type) {
    case RECEIVE_MESSAGES:
      action.messages.map(message => {
        messages[message._id] = message;
      });
      return messages;
    case RECEIVE_MESSAGE:
      return Object.assign({}, state, { [action.message._id]: action.message });

    case REMOVE_CHAT:
      const newState = {}
      Object.values(state).forEach(message => {
        if (message.chatId !== action.chatId) {
          newState[message._id] = message
        }
      });

      return newState;

    default:
      return state;
  }
}
