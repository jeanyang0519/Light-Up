import io from 'socket.io-client';
import * as ChatUtil from '../util/chat_api_util'
import { receiveErrors } from './user_actions';
export const RECEIVE_CHATS = "RECEIVE_CHATS";
export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const socket = io.connect('http://localhost:5000')


const receiveChats = (chats) => ({
    type: RECEIVE_CHATS,
    chats
})

const receiveMessages = messages => ({
  type: RECEIVE_MESSAGES,
  messages
});

const receiveSingleMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
});

export const fetchChats = (userId) => dispatch => {
    return ChatUtil.fetchChats(userId).then(res => {
        dispatch(receiveChats(res.data))
    }, err =>  receiveErrors(err))
}

export const fetchMessages = chatId => dispatch => {
  return ChatUtil.fetchMessages(chatId).then(
    res => {
      dispatch(receiveMessages(res.data));
    },
    err => receiveErrors(err)
  );
};

export const createNewMessage = (userId, data) => dispatch => {
    return ChatUtil.createNewMessage(userId, data).then(res => {
        dispatch(receiveSingleMessage(res.data))
        socket.emit('new message', res.data)
    })
}