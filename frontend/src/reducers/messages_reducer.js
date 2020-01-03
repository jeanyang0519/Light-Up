import {
  RECEIVE_MESSAGE,
  RECEIVE_MESSAGES
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
      return Object.assign({}, state, { [action.message._id]: action.message })
    default:
      return state;
  }
}
