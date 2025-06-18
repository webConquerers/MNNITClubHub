// utils/authUtils.js
import axios from "axios";

export const saveAuthToken = (token) => {
  localStorage.setItem("token", token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const storeUserSession = (userName, userId) => {
  localStorage.setItem("userName", userName);
  localStorage.setItem("userId", userId);
};

export const logoutUser = () => {
  localStorage.clear();
  delete axios.defaults.headers.common["Authorization"];
};
