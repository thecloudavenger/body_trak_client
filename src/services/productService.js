import axios from "axios";

import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl;

export function getProducts() {
  try {
    return axios.get(apiEndpoint + 'store/products/');
    
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; 
  }
}
