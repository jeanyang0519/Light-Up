import io from 'socket.io-client';
import * as ChatUtil from '../util/chat_api_util'
export const RECEIVE_CHATS = "RECEIVE_CHATS";
export const socket = io.connect('http://localhost:5000')


const receiveChats = (chats) => ({
    type: RECEIVE_CHATS,
    chats
})

export const fetchChats = (userId) => dispatch => {
    return ChatUtil.fetchChats(userId).then(chats => {
        console.log("Updating")
    })
}

export const createNewMessage = (userId, data) => dispatch => {
    return ChatUtil.createNewMessage(userId, data).then(res => {
        console.log(res.data)
        socket.emit('new message', "5e0a57a96a0bd7e29328b9b8")
    })
}