import React, { useState, useEffect } from "react";
import "./operationemploye.css";
import Title from "../../Components/title/Title";
import Select from "../../Components/forms/Select";
import { country } from "../../services/country";
import { toast } from "react-toastify";
import departementApi from "../../services/departementApi";
import contratApi from "../../services/contratApi";
import postApi from "../../services/postApi";
import authApi from "../../services/authApi";
import employeApi from "../../services/employeApi";
export default function OperationEmploye() {
  let userTokenData = authApi.getUserInfo();
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    photo: "",
    roles: "",
    adresse: "",
    poste: "",
    Departement: "",
    sexe: "",
    telephone: "",
    cin: "",
    statut: "",
    enfant: "0",
    matricule: "",
    dateNaissance: "",
    pays: "",
  });
  const [type, setType] = useState([]);
  const [contrat, setContrat] = useState({
    type: "",
    DateDebut: "",
    DateFin: "",
    user: "",
    salaire: "",
  });
  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    if (userTokenData.includes("ROLE_SUPER")) {
      setUser({
        ...user,
        [name]: value,
        photo: `https://avatars.dicebear.com/api/initials/${
          user.firstName + " " + user.lastName
        }.svg`,
        roles: ["ROLE_AGENT"],
      });
    } else {
      setUser({
        ...user,
        [name]: value,
        photo: `https://avatars.dicebear.com/api/initials/${
          user.firstName + " " + user.lastName
        }.svg`,
        roles: ["ROLE_EMPLOYE"],
      });
    }
  };
  const handleContrat = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;

    setContrat({
      ...contrat,
      [name]: value,
    });
  };

  const [departements, setDepartements] = useState([]);
  const [postes, setPostes] = useState([]);

  const fetchDepartements = async () => {
    try {
      const data = await departementApi.findAll();
      if (userTokenData.includes("ROLE_SUPER")) {
        const resources_humaines = data.filter(
          (d) => d.Nom == "Ressources Humaines"
        );
        setDepartements(resources_humaines[0]);
      } else {
        setDepartements(data);
      }
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const fetchTypes = async () => {
    try {
      const data = await contratApi.findAll();
      setType(data);
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchDepartements();
  }, []);

  useEffect(() => {
    fetchTypes();
  }, []);
  //   Charger les départements
  // Charger les postes
  const handleChoose = async (event) => {
    const value = event.currentTarget.value;
    if (value != 0) {
      const response = await postApi.findOneById(value);
      console.log(response);
      setPostes(response);
    } else {
      setPostes([]);
    }
  };

  // Charger les Types de Contrats
  //
  const handleSubmit = async (event) => {
    toast.info("EN ATTENTE, VEUILLEZ PATIENTEZ S'IL VOUS PLAIT");
    event.preventDefault();
    try {
      const user_response = await employeApi
        .create(
          user.email,
          user.password,
          user.firstName,
          user.lastName,
          user.photo,
          user.adresse,
          user.poste,
          user.roles,
          user.matricule,
          user.sexe,
          user.cin,
          user.telephone,
          user.statut,
          user.enfant,
          user.dateNaissance,
          user.pays
        )
        .then((response) => response.data.id);
      console.log(user_response);
      toast.success("Ajout de l'utilisateur reussi");
      toast.info("Affectation du contrat en cours");
      const contrat_api = await employeApi
        .addUserContrat(
          contrat.type,
          contrat.DateDebut,
          contrat.DateFin,
          user_response
        )
        .then((response) => response.data.id);
      toast.info("Mis à jour du salaire");
      // AJOUT DU SALAIRE
      await employeApi.addUserSalary(contrat.salaire, contrat_api);
      toast.success("Opération Réussie");
    } catch (error) {
      toast.warning("Error lors de l'ajout, verifiez vos entrées");
      console.log(error.response);
    }
  };

  return (
    <div className="Employee d-flex-4">
      <div className="centre">
        <Title nomdepage="Dashboard" subname="Ajout Employé"></Title>
        <form onSubmit={handleSubmit}>
          <div className="input-form">
            <h4 className="Information-Header">Informations Personnelles</h4>
            <div className="formulaire">
              <div className="flex-direction">
                <div className="form-wrap">
                  <label htmlFor="">Prenom</label>
                  <input
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    defaultValue=""
                    required
                  />
                </div>
                <div className="form-wrap">
                  <label htmlFor="">Nom</label>
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    defaultValue=""
                    required
                  />
                </div>
              </div>
              <div className="flex-direction">
                <div className="form-wrap">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    defaultValue=""
                    required
                  />
                </div>
                <div className="form-wrap sexe">
                  <label htmlFor="">Sexe</label>
                  <input
                    type="radio"
                    value="Homme"
                    name="sexe"
                    onChange={handleChange}
                  />
                  Homme
                  <input
                    type="radio"
                    value="Femme"
                    name="sexe"
                    onChange={handleChange}
                  />
                  Femme
                </div>
              </div>
              <div className="flex-direction">
                <div className="form-wrap">
                  <label htmlFor="">CIN</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="cin"
                    defaultValue=""
                    required
                  />
                </div>
                <div className="form-wrap">
                  <label htmlFor="">Telephone</label>
                  <input
                    type="text"
                    name="telephone"
                    onChange={handleChange}
                    defaultValue=""
                  />
                </div>
              </div>
              <div className="flex-direction">
                <div className="form-wrap sexe">
                  <Select
                    name="statut"
                    label="Staut matrimonial"
                    onChange={handleChange}
                  >
                    <option value="">----------------------------</option>
                    <option value="Mariée">Mariée</option>
                    <option value="Célibataire">Célibataire</option>
                    <option value="Autre">Autre</option>
                  </Select>
                </div>
                <div className="form-wrap">
                  <label htmlFor="">Mot de passe</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    defaultValue=""
                    required
                  />
                </div>
                {/* Import Select */}
              </div>
              <div className="flex-direction">
                <div className="form-wrap">
                  <label htmlFor="" value="0">
                    Enfants
                  </label>
                  <input
                    type="number"
                    name="enfant"
                    onChange={handleChange}
                    defaultValue="0"
                  />
                </div>
                <div className="form-wrap">
                  <label htmlFor="">Adresse</label>
                  <input
                    type="text"
                    name="adresse"
                    onChange={handleChange}
                    defaultValue=""
                    required
                  />
                </div>
              </div>
              <div className="flex-direction">
                <div className="form-wrap">
                  <label htmlFor="">Date de naissance</label>
                  <input
                    type="date"
                    name="dateNaissance"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-wrap sexe">
                  <Select
                    name="pays"
                    label="Pays de Naissance"
                    onChange={handleChange}
                  >
                    <option value="">-------------------------</option>
                    {country.map((pays) => (
                      <option value={pays}>{pays}</option>
                    ))}
                    {/* <option value="Mariée">Mariée</option>
                  <option value="Célibataire">Mariée</option>
                  <option value="Autre">Autre</option> */}
                  </Select>
                </div>
              </div>
            </div>
            {/* INFORMATION HEADER */}
            <div className="poste-information">
              <h4 className="Information-Header">Poste</h4>
              <div className="flex-direction">
                <div className="form-wrap sexe">
                  <Select
                    name="Departement"
                    label="Départements"
                    onChange={handleChoose}
                  >
                    <option value="">--------------------------</option>
                    {userTokenData.includes("ROLE_SUPER") ? (
                      <option key={departements.id} value={departements.id}>
                        {departements.Nom}
                      </option>
                    ) : (
                      <>
                        {departements.map((departement) => (
                          <option key={departement.id} value={departement.id}>
                            {departement.Nom}
                          </option>
                        ))}
                      </>
                    )}
                  </Select>
                </div>
                <div className="form-wrap sexe">
                  {postes.length > 0 ? (
                    <>
                      {" "}
                      <Select
                        name="poste"
                        label="Poste"
                        onChange={handleChange}
                      >
                        <option value="">Choisissez un poste</option>
                        {postes.map((poste) => (
                          <option key={poste.id} value={poste.id}>
                            {poste.Designation}
                          </option>
                        ))}
                      </Select>
                    </>
                  ) : (
                    <>
                      <p>
                        Veuillez sélectionner un département ayant des postes
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="flex-direction">
                <div className="form-wrap sexe">
                  <Select
                    name="type"
                    label="Type de Contrat"
                    onChange={handleContrat}
                  >
                    <option value="------------------------------">
                      Choisissez le type de Contrat
                    </option>
                    {type.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.nom}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="form-wrap">
                  <label htmlFor="">Date d'entrée</label>
                  <input
                    type="date"
                    name="DateDebut"
                    onChange={handleContrat}
                  />
                </div>
              </div>
              <div className="flex-direction">
                <div className="form-wrap">
                  <label htmlFor="" value="0">
                    Date de sortie
                  </label>
                  <input type="date" onChange={handleContrat} name="DateFin" />
                </div>
                <div className="form-wrap">
                  <label htmlFor="">Matricule</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="matricule"
                    defaultValue=""
                  />
                </div>
              </div>
              <div className="flex-direction">
                <div className="form-wrap">
                  <label htmlFor="">Salaire</label>
                  <input
                    type="text"
                    onChange={handleContrat}
                    name="salaire"
                    defaultValue=""
                  />
                </div>
              </div>
            </div>
            <div className="submit-form">
              <button type="submit">Envoyer</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
