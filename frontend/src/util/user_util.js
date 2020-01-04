import axios from 'axios';


export const fetchUsers = () => {
  return axios.get('/api/users');
};

export const fetchUser = (id) => {
  return axios.get(`/api/users/${id}`);
};

export const update = (id, data) => {
  return axios.put(`/api/users/${id}`, data);
};

export const fetchCurrentUser = id => {
  return axios.get(`/api/users/${id}`);
};