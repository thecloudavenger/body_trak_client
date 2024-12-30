import jwtDecode from "jwt-decode";
import axios from "axios";
import logger from './logService';

import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth/jwt";
const tokenKey = "token";

export async function login(username, password) {
  const { data: jwt } = await axios.post(apiEndpoint + "/create", { username, password });
  axios.defaults.headers["X-Auth-Token"] = jwt['access'];
  localStorage.setItem(tokenKey, jwt['access']);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    logger.log(ex);
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
