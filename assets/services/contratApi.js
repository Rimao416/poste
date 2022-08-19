import axios from "axios";
import { CONTRATS_API,CONTRATS_USER_API } from "../config";
function findAll() {
  return axios.get(CONTRATS_API).then((response) => response.data);
}
// CONTRAT
function findAllContratsUser(){
  return axios.get(CONTRATS_USER_API).then((response) => response.data);
  
}

export default{
    findAll,
    findAllContratsUser
}