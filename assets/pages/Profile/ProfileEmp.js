import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profileemploye.css";
import globalFunction from "../../services/globalFunction";
import moment from "moment";
import Title from "../../Components/title/Title";
import employeApi from "../../services/employeApi";
import ModalOperationEmployee from "../../Components/modal/ModalOperationEmployee";
import GithubProfile from "../../Components/loaders/GithubLoader";
import { FaUserEdit } from "react-icons/fa";
const ProfileEmp = () => {
  console.log(window.localStorage.getItem("authToken"));
  const profile_id = window.localStorage.getItem("authToken");
  const [userId, setUserId] = useState(0);
  const [user, setUser] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    enfant: "",
    matricule: "",
    pays: "",
    photo: "",
    poste: "",
    cin: "",
    adresse: "",
    poste_id: "",
    departement: "",
    departement_id: "",
    sexe: "",
    telephone: "",
    statut: "",
    dateNaissance: "",
  });
  const [loading, setLoading] = useState(true);
  const [loadingContrat, setLoadingContrat] = useState(true);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [type, setType] = useState("");
  const [toggleState, setToggleState] = useState(1);
  const [contrat, setContrat] = useState([]);
  const [contratId, setContratId] = useState(0);
  // const [contrat, setContrat] = useState({
  //   id: "",
  //   type: "",
  //   DateDebut: "",
  //   DateFin: "",
  // });
  const [congeDashboard, setCongeDashboard] = useState({
    accepte: 0,
    refuse: 0,
    attente: 0,
  });
  const [userData, setUserData] = useState([]);
  const fetchData = async (id) => {
    const data = await employeApi.find(id);
    setUserData(data);
    console.log(data);
    console.log(data.poste.Designation);
    setLoading(false);
    setUser({
      id: data.id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      enfant: data.enfant,
      matricule: data.matricule,
      pays: data.pays,
      photo: data.photo,
      poste: data.poste.Designation,
      poste_id: data.poste.id,
      departement: data.poste.departement.Nom,
      departement_id: data.poste.departement.id,
      dateNaissance: data.dateNaissance,
      sexe: data.sexe,
      telephone: data.telephone,
      statut: data.statut,
      adresse: data.adresse,
      cin: data.cin,
    });
  };
  const [conge_data, setCongeData] = useState([]);
  const fetchConge = async (id_user) => {
    const data = await employeApi.findOneConge(id_user);
    data.map((d) => {
      if (d.status == "ACCEPTE") {
        setCongeDashboard();
        setCongeDashboard({
          ...congeDashboard,
          accepte: ++congeDashboard.accepte,
        });
      } else if (d.status == "REJETEE") {
        setCongeDashboard({
          ...congeDashboard,
          refuse: ++congeDashboard.refuse,
        });
      } else if (d.status == "EN ATTENTE") {
        setCongeDashboard({
          ...congeDashboard,
          attente: ++congeDashboard.attente,
        });
      }
    });
    setCongeData(data);
  };
  useEffect(() => {
    fetchData(profile_id);
  }, []);
  useEffect(() => {
    fetchConge(profile_id);
  }, []);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  // Charger les contrats
  const fetchContratList = async (id) => {
    const contratList = await employeApi.findOneContrat(id);
    console.log(contratList);
    setContrat(contratList);
    // setContrat({
    //   id: contratList[0].id,
    //   type: contratList[0].type.nom,
    //   DateDebut: contratList[0].DateDebut,
    //   DateFin: contratList[0].DateFin,
    // });
    setLoadingContrat(false);
  };
  useEffect(() => {
    fetchContratList(profile_id);
  }, []);

  console.log("L'id est" + profile_id);
  return (
    <>
      <div className="ProfileEmployee d-flex-4">
        <div className="centre">
          <Title nomdepage="Dashboard" subname="Profile" />

          <div className="header-profile">
            {!loading && (
              <>
                <div className="left-section">
                  <img src={user.photo} alt="" />
                  <div className="presentation">
                    <h3>{user.firstName + " " + user.lastName}</h3>
                    <h5>{user.departement}</h5>
                    <h5>{user.poste}</h5>
                    <h5>Matricule : {user.matricule}</h5>
                  </div>
                </div>

                <div className="right-section">
                  <div className="coordonnees">
                    <div className="g_coor">
                      <ul>
                        <li>Phone:</li>
                        <li>Email:</li>
                        <li>Anniversaire:</li>
                        <li>Addresse:</li>

                        {/* Fonction du genre sexe==="homme" ? 'Masculine':'Feminin' */}
                      </ul>
                    </div>
                    <div className="g_droite">
                      <ul>
                        <li>{user.telephone}</li>
                        <li>{globalFunction.isValue(user.email)}</li>
                        <li>
                          {globalFunction.isValue(
                            moment(user.dateNaissance).format("DD-MM-YYYY")
                          )}
                        </li>
                        <li>{globalFunction.isValue(user.adresse)}</li>
                        {/* Fonction du genre sexe==="homme" ? 'Masculine':'Feminin' */}
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  className="icon"
                  onClick={() => {
                    setIsModalOpened(true);
                    setType("HEADER_INFO");
                  }}
                >
                  <FaUserEdit />
                </div>
                <div className="container-tabs">
                  <nav
                    className={toggleState === 1 ? "active" : ""}
                    onClick={() => toggleTab(1)}
                  >
                    Informations Personnelles
                  </nav>
                  <nav
                    className={toggleState === 2 ? "active" : ""}
                    onClick={() => toggleTab(2)}
                  >
                    Contrats
                  </nav>
                  <nav
                    className={toggleState === 3 ? "active" : ""}
                    onClick={() => toggleTab(3)}
                  >
                    Congés
                  </nav>
                  <nav
                    className={toggleState === 4 ? "active" : ""}
                    onClick={() => toggleTab(4)}
                  >
                    Salaire
                  </nav>
                  <nav
                    className={toggleState === 5 ? "active" : ""}
                    onClick={() => toggleTab(5)}
                  >
                    Télétravail
                  </nav>
                </div>
              </>
            )}
            {loading && <GithubProfile />}
          </div>

          {toggleState == 1 && (
            <div className="body-profile">
              <>
                <div className="card-profile">
                  <h3 className="title-profile">Informations Personnelles</h3>
                  {!loading && (
                    <div className="informations">
                      <div className="text">
                        <h4>CIN</h4>
                        <h4>Matricule</h4>
                        <h4>Statut</h4>
                        <h4>Pays</h4>
                        <h4>Genre</h4>
                        <h4>Enfants</h4>
                      </div>
                      <div className="title">
                        <h4>{globalFunction.isValue(user.cin)}</h4>
                        <h4>{globalFunction.isValue(user.matricule)}</h4>
                        <h4>{globalFunction.isValue(user.statut)}</h4>
                        <h4>{globalFunction.isValue(user.pays)}</h4>
                        <h4>{globalFunction.isValue(user.sexe)}</h4>
                        <h4>{globalFunction.isValue(user.enfant)}</h4>
                      </div>
                      <div
                        className="icon"
                        onClick={() => {
                          setIsModalOpened(true);
                          setType("INFO_PERSO");
                        }}
                      >
                        <FaUserEdit />
                      </div>
                    </div>
                  )}
                  {loading && <GithubProfile />}
                </div>
                <div className="card-profile">
                  <h3 className="title-profile">Poste</h3>
                  <div className="informations">
                    <div className="text">
                      <h4>Département</h4>
                      <h4>Poste</h4>
                    </div>
                    <div className="title">
                      <h4>{user.poste}</h4>
                      <h4>{user.departement}</h4>
                    </div>
                    <div
                      className="icon"
                      onClick={() => {
                        setIsModalOpened(true);
                        setType("POSTE_INFO");
                      }}
                    >
                      <FaUserEdit />
                    </div>
                  </div>
                </div>
              </>
            </div>
          )}

          {toggleState === 2 && (
            <div className="body-profile">
              <>
                {contrat.map((c, idx) => (
                  <div className="card-profile" key={c.id}>
                    <h3 className="title-profile">Contrat</h3>
                    {/* {!loadingContrat && ( */}

                    <div key={c.id} className="informations">
                      <div className="text">
                        <h4>Type</h4>
                        <h4>Date de Début</h4>
                        <h4>Date de Fin</h4>
                      </div>
                      <div className="title">
                        <h4>{c.type.nom}</h4>
                        <h4>{moment(c.DateDebut).format("DD-MM-YYYY")}</h4>
                        <h4>{moment(c.DateFin).format("DD-MM-YYYY")}</h4>
                      </div>
                      <div
                        className="icon"
                        onClick={() => {
                          setIsModalOpened(true);
                          setType("CONTRAT_INFO");
                          setContratId(c.id);
                        }}
                      >
                        {/*  J'hésite entre mettre seulement contrat en mode lecture ou non, c'est pourquoi je laisse toutes les fonctionnalités qui lui sont attribués {contrat.length-1 === idx && <FaUserEdit />} */}
                      </div>
                    </div>

                    {/* )}
                {loadingContrat && <GithubProfile />} */}
                  </div>
                ))}
              </>
            </div>
          )}
          {toggleState == 3 && (
            <>
              <div className="contrat_tabs">
                <div className="contrat_container">
                  <h3 className="container_actual">
                    {congeDashboard.accepte} <span>Demandes acceptées</span>{" "}
                  </h3>
                  <h3 className="container_actual">
                    {congeDashboard.refuse} <span>Demandes refusées</span>{" "}
                  </h3>
                  <h3 className="container_actual">
                    {congeDashboard.attente} <span>Demandes en attente</span>{" "}
                  </h3>
                </div>
                {conge_data.map((conge) => (
                  <div className="contrat_container">
                    <div className="partie_date">
                      <p>
                        Du {moment(conge.DateDebut).format("DD-MM-YYYY")} au{" "}
                        {moment(conge.DateFin).format("DD-MM-YYYY")}
                      </p>
                    </div>
                    <div className="date_status">
                      <p>{conge.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <ModalOperationEmployee
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        user={user}
        setUser={setUser}
        type={type}
        setType={setType}
        contrat={contrat}
        setContrat={setContrat}
        contratId={contratId}
        setContratId={setContratId}
      />
    </>
  );
};

export default ProfileEmp;
