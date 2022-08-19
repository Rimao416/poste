import React, { useState, useEffect } from "react";
import "./OpAgent.css";
import Title from "../../Components/title/Title";
import Select from "../../Components/forms/Select";
import axios from "axios";
import moment from "moment";
import { country } from "../../services/country";
import { toast } from "react-toastify";
import departementApi from "../../services/departementApi";
import contratApi from "../../services/contratApi";
import postApi from "../../services/postApi";
import { CONTRATS_USER_API,CONTRATS_API, EMPLOYES_API } from "../../config";
export default function OperationAgent() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    photo: "",
    roles: ["ROLE_AGENT"],
    adresse: "",
    poste: "",
    Departement: "",
    sexe: "",
    telephone: "",
    cin: "",
    statut: "",
    enfant: "",
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
  });
  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setUser({
      ...user,
      [name]: value,
      photo: `https://avatars.dicebear.com/api/initials/${
        user.firstName + " " + user.lastName
      }.svg`,
    });
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
      const resources_humaines = data.filter(
        (d) => d.Nom == "Ressources Humaines"
      );
      // setDepartements(data);
      setDepartements(resources_humaines[0]);

      // if(!user.Departement)setUser({...user,Departement:data[0].id})
    } catch (error) {
      console.log(error.response);
    }
  };
  const fetchTypes = async () => {
    try {
      const data = await contratApi.findAll();
      setType(data);
      console.log(data);

      // if(!user.Departement)setUser({...user,Departement:data[0].id})
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
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    console.log(value);
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
    console.log(user);
    console.log(contrat);
    try {
      const user_reponse = await axios.post(EMPLOYES_API, {
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        photo: user.photo,
        adresse: user.adresse,
        roles: user.roles,
        poste: `/api/postes/${user.poste}`,
        matricule: user.matricule,
        sexe: user.sexe,
        cin: user.cin,
        telephone: user.telephone,
        statut: user.statut,
        enfant: user.enfant,
        dateNaissance: user.dateNaissance,
        pays: user.pays,
        cree:moment().format("YYYY-MM-DD").toString()
      }).then(response=>response.data.id);
      axios.post(CONTRATS_USER_API,{
        type:`api/type_contrats/${contrat.type}`,
        DateDebut:contrat.DateDebut,
        DateFin:contrat.DateFin,
        user:`api/users/${user_reponse}`
      })
      toast.success("Ajout Réussi");

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
                  />
                </div>
                <div className="form-wrap">
                  <label htmlFor="">Nom</label>
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    defaultValue=""
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
                    label="Statut matrimonial"
                    onChange={handleChange}
                  >
                    <option>-------------------------</option>
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
                    defaultValue=""
                  />
                </div>
                <div className="form-wrap">
                  <label htmlFor="">Adresse</label>
                  <input
                    type="text"
                    name="adresse"
                    onChange={handleChange}
                    defaultValue=""
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
                    <option>--------------------------</option>
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

                    <option key={departements.id} value={departements.id}>
                      {departements.Nom}
                    </option>
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
