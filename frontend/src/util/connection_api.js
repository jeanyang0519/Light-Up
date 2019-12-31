import axios from 'axios';

export const requestConnection = (data) => {
  return axios.post('/api/connections/requestConnection', data);
};

export const acceptConnection = (data) => {
  return axios.post('/api/connections/acceptConnection', data);
};

export const removeConnection = (data) => {
  return axios.post('/api/connections/removeConnection', data);
};