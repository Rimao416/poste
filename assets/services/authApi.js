import axios from "axios";
import jwtDecode from "jwt-decode";
import { LOGIN_API } from "../config";
function logout() {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
}

function authenticate(credentials) {
  return axios
    .post(LOGIN_API, credentials)
    .then((response) => response.data.token)
    .then((token) => {
      //Je stocke le token dans mon local storage
      window.localStorage.setItem("authToken", token);
      //On prévient axios qu'on a un header par défaut
      axios.defaults.headers["Authorization"] = "Bearer " + token;
      return true;
    });
}
function setup() {
  //Voir si on a un token
  const token = window.localStorage.getItem("authToken");
  //2 Si le token est valide
  //Pour ça on va devoir s'installer un petit package, et Jwt-decode
  if (token) {
    const jwtData = jwtDecode(token);
    //Comparaison
    if (jwtData.exp * 1000 > new Date().getTime()) {
      axios.defaults.headers["Authorization"] = "Bearer " + token;
    } else {
      logout();
    }
  } else {
    logout();
  }
}
function isAuthenticated() {
  //Voir si on a un token
  const token = window.localStorage.getItem("authToken");
  //2 Si le token est valide
  //Pour ça on va devoir s'installer un petit package, et Jwt-decode
  if (token) {
    const jwtData = jwtDecode(token);
    //Comparaison
    if (jwtData.exp * 1000 > new Date().getTime()) {
      return true;
    } else {
      return false;
    }
    return false;
  }
}
function getUserInfo() {
  const token = window.localStorage.getItem("authToken");
  if (token) {
    const jwtData = jwtDecode(token);
    return jwtData.roles;
  } else {
    return "moi";
  }
}
function getUser() {
  let jwtData = "";
  const token = window.localStorage.getItem("authToken");
  if (token) {
    jwtData = jwtDecode(token);
  }
  return jwtData;
}
export default {
  authenticate,
  logout,
  setup,
  isAuthenticated,
  getUserInfo,
  getUser,
};
