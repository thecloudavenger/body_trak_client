import axios from "axios";

import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl;

export function getOrders() {
  const api = axios.create({
    baseURL: apiEndpoint, 
  });
  
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `JWT ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return api.get(
    apiEndpoint + 'store/orders/'
  );

}
