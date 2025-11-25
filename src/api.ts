import React from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

export const authAPI = {
  register: async (data: { username: string; password: string }) => {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, data);
    return response.data;
  },
  login: async (data: { username: string; password: string }) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
    return response.data;
  },
};

export const calculationsAPI = {
  getAll: async () => {
    const response = await axios.get(`${API_BASE_URL}/calculations`);
    return response.data;
  },
  create: async (data: any) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_BASE_URL}/calculations`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};
