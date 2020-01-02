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


