import axios from "axios";


export const fetchChats = userId => {
  return axios.get(`/api/chats/${userId}`);
};

export const createNewMessage = (userId, data) => {
  return axios.post(`api/chats/messages/new/${userId}`, data);
};

export const fetchMessages = chatId => {
  return axios.get(`api/chats/${chatId}/messages`);
}

export const createChat = (userId, data) => {
  return axios.post(`api/chats/new/${userId}`, data);
}

export const leaveChat = (chatId, data) => {
  debugger
  return axios.patch(`api/chats/${chatId}`, data)
}