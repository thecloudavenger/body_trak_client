import axios from "axios";

import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl;

export function createCart() {
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

  return api.post(
    apiEndpoint + 'store/carts/'
  );

}


export function addToCart(cartId, productId, quantity = 1) {
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

    return api.post(
        `store/carts/${cartId}/items/`,
        { product_id: productId, 
          quantity: quantity }
      );
  }


export function getCartItems(cartId) {
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
      apiEndpoint +  `store/carts/${cartId}/items/`,
    );
  
  }


  export function getCartId() {
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
      apiEndpoint +  `store/carts/`,
    );
  
  }