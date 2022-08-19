import axios from "axios";
import { CONTRATS_API } from "../config";
function findAll() {
  return axios.get(CONTRATS_API).then((response) => response.data);
}
// CONTRAT
// function findAllContratsUser(){
//   return axios.get(CONTRATS_USER_API).then((response) => response.data);
// }
function create(contrat) {
  return axios.post(CONTRATS_API, contrat);
}
function update(id, contrat) {
  return axios.put(CONTRATS_API + "/" + id, contrat);
}
function deleteContratType(id) {
  return axios.delete(CONTRATS_API + "/" + id);
}

export default {
  create,
  findAll,
  update,
  delete: deleteContratType,
};
