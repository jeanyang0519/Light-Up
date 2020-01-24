import io from 'socket.io-client';
import * as ChatUtil from '../util/chat_api_util'
import { receiveErrors, clearErrors } from './session_actions';
export const RECEIVE_CHATS = "RECEIVE_CHATS";
export const RECEIVE_CHAT = "RECEIVE_CHAT"
export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const REMOVE_CHAT = "REMOVE_CHAT";
export const socket = io()


const receiveChats = (chats) => ({
    type: RECEIVE_CHATS,
    chats
})

const receiveChat = (chat) => ({
  type: RECEIVE_CHAT,
  chat
})

const receiveMessages = messages => ({
  type: RECEIVE_MESSAGES,
  messages
});

const receiveSingleMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
});

const removeChat = chatId => ({
  type: REMOVE_CHAT,
  chatId
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

export const createChat = (userId, data) => dispatch => {

  return ChatUtil.createChat(userId, data).then(res => {
    dispatch(clearErrors())
    dispatch(receiveChat(res.data.chat))
    dispatch(receiveSingleMessage(res.data.message))
    
    // debugger
    return res.data.chat

  }, err => {dispatch(receiveErrors(err.response.data))})
}

export const leaveChat = (chatId, data) => dispatch => {
  debugger
  return ChatUtil.leaveChat(chatId, data).then(
    res => {
      debugger
      dispatch(removeChat(chatId));
    },
    err => {
      dispatch(receiveErrors(err.response.data));
    }
  );
};

