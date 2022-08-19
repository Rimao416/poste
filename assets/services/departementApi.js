import axios from "axios";
import { DEPARTEMENTS_API } from "../config";
function findAll() {
  return axios.get(DEPARTEMENTS_API).then((response) => response.data);
}
function deleteDepartement(id) {
  return axios.delete(DEPARTEMENTS_API + "/" + id);
}
function find(id) {
  return axios
    .get(DEPARTEMENTS_API + "/" + id)
    .then((response) => response.data);
}
function update(id, departement) {
  return axios.put(DEPARTEMENTS_API + "/" + id, departement);
}
function create(departement) {
  return axios.post(DEPARTEMENTS_API, departement);
}
function departementJoinPoste(id) {
  return axios.get(DEPARTEMENTS_API + "/" + id + "/postes");
}

// DASHBOARD DE DEPARTEMENT
// Une fonction qui me retourne le nombre des postes crée par année

export default {
  findAll,
  find,
  update,
  create,
  delete: deleteDepartement,
  departementJoinPoste,
};
