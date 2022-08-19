import moment from "moment";
import axios from "axios";
import { CONTRATS_USER_API, EMPLOYES_API, SALAIRES_API } from "../config";
function getUsers() {
  return axios.get(EMPLOYES_API).then((response) => response.data);
  // .then((response) => response.data["hydra:member"]);
}

function find(id) {
  return axios.get(EMPLOYES_API + "/" + id).then((response) => response.data);
}
function create(
  Email,
  Password,
  Firstname,
  Lastname,
  Photo,
  Adresse,
  Poste,
  Roles,
  Matricule,
  Sexe,
  Cin,
  Telephone,
  Statut,
  Enfant,
  DateNaissance,
  Pays
) {
  return axios.post(EMPLOYES_API, {
    email: Email,
    password: Password,
    firstName: Firstname,
    lastName: Lastname,
    photo: Photo,
    adresse: Adresse,
    roles: Roles,
    poste: `/api/postes/${Poste}`,
    matricule: Matricule,
    sexe: Sexe,
    cin: Cin,
    telephone: Telephone,
    statut: Statut,
    enfant: Enfant,
    dateNaissance: DateNaissance,
    pays: Pays,
    cree: moment().format("YYYY-MM-DD").toString(),
  });
}
function update(id, Email, Firstname, Lastname, Adresse, Poste) {
  return axios.put(EMPLOYES_API + "/" + id, {
    email: Email,
    firstName: Firstname,
    lastName: Lastname,
    adresse: Adresse,
    poste: `/api/postes/${Poste}`,
  });
}
function deleteEmploye(id) {
  return axios.delete(EMPLOYES_API + "/" + id);
}
function findOneContrat(id) {
  return axios
    .get(EMPLOYES_API + "/" + id + "/contrats")
    .then((response) => response.data);
}

function findOneConge(id) {
  return axios
    .get(EMPLOYES_API + "/" + id + "/conges")
    .then((response) => response.data);
}
function addUserContrat(Type, dateDebut, dateFin, User) {
  if (dateFin == "") {
    return axios.post(CONTRATS_USER_API, {
      type: `api/type_contrats/${Type}`,
      DateDebut: dateDebut,
      user: `api/users/${User}`,
    });
  } else {
    return axios.post(CONTRATS_USER_API, {
      type: `api/type_contrats/${Type}`,
      DateDebut: dateDebut,
      DateFin: dateFin,
      user: `api/users/${User}`,
    });
  }
}

function addUserSalary(Salaire, Contrat) {
  return axios.post(SALAIRES_API, {
    montant: Salaire,
    contrat: `api/contrats/${Contrat}`,
  });
}

export default {
  find,
  create,
  update,
  getUsers,
  delete: deleteEmploye,
  findOneContrat,
  findOneConge,
  addUserContrat,
  addUserSalary,
};
