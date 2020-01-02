import {
  RECEIVE_MESSAGE,
  RECEIVE_MESSAGES
} from "../actions/chat_actions";

export default function(state = {}, action) {
  Object.freeze(state);
    const messages = {};
  switch (action.type) {
    case RECEIVE_MESSAGES:
      action.messages.map(message => {
        messages[message._id] = message;
      });
      return messages;
    case RECEIVE_MESSAGE:
      messages = {};
      Object.values(action.message).map(msg => {
        messages[msg._id] = msg;
      });
    default:
      return state;
  }
}
