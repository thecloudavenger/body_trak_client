import axios from "axios";

import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl;

export function getProducts() {
  return axios.get(
    apiEndpoint + 'store/products/'
  );
}
