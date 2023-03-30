import axios from "axios";
import { PROJETS_API } from "../config";
// function find(id) {
//   return axios
//     .get(REPOS_API+"/"+ id)
//     .then((response) => response.data);
// }
function findAll() {
  return axios.get(PROJETS_API).then((response) => response.data);
  // .then((response) => response.data["hydra:member"]);
}
function findSingle() {
  return axios.get(PROJETS_API + "/single").then((response) => response.data);
  // .then((response) => response.data["hydra:member"]);
}
function create(Nom, DateDebut, DateSoumission, Employe) {
  return axios.post(PROJETS_API, {
    nom: Nom,
    dateDebut: DateDebut,
    dateSoumission: DateSoumission,
    employe: ["/api/users/" + Employe],
    statut: "EN COURS",

    // cree: moment().format("YYYY-MM-DD").toString(),
  });
}
function actionProjet(id,Statut){
  return axios.put(PROJETS_API+"/"+id,{
    statut:Statut
  })
}

// function findAllDay(){
//   return axios
//   .get(JOUR_API)
//   .then((response) => response.data["hydra:member"]);
// }

// function update(id, conge) {
//   return axios
//     .put(REPOS_API+"/"+id, conge)
//     .then((response) => response.data);
// }
// function deleteFerie(id) {
//   return axios
//     .delete(REPOS_API+"/"+id+"/delete")
//     .then((response) => response.data);
// }
// function createJour(day, id) {
//   return axios.post(JOUR_API, {
//     startAt: day,
//     repos: `api/repos/${id}`,
//   });
// }
// function createRepos(conge) {
//   return axios
//     .post(REPOS_API, conge)
//     .then((response) => response.data);
// }
// function deleteRepos(id) {
//   return axios.delete(REPOS_API+"/"+id);
// }

export default {
  findAll,
  findSingle,
  create,
  actionProjet
};
