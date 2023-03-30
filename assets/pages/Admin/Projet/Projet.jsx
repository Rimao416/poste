import moment from "moment";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "../../../Components/header/Header";
import TableLoader from "../../../Components/loaders/TableLoader";
import ActionProjet from "../../../Components/modal/ActionProjet";
import ProjetModal from "../../../Components/modal/ProjetModal";
import Navbar from "../../../Components/navbar/Navbar";
import SideBar from "../../../Components/sidebar/SideBar";
import projetApi from "../../../services/projetApi";
import userApi from "../../../services/userApi";
function Projet() {
  const handleAnnuler = async (id) => {
    try {
      console.log(id);
      const data = projetApi.actionProjet(id,"ANNULE");
      window.location.reload()
      toast.success("Changement effectué");
      // toast.success(id);
    } catch (error) {
      toast.error("Une erreur s'est produite");
    }
  };
  const handleTerminer = async (id) => {
    try {
      console.log(id);
      const data = projetApi.actionProjet(id,"TERMINE");
      window.location.reload()
      toast.success("Changement effectué");
      // toast.success(id);
    } catch (error) {
      toast.error("Une erreur s'est produite");
    }
  };
  const handleCours = async (id) => {
    try {
      console.log(id);
      const data = projetApi.actionProjet(id,"EN COURS");
      window.location.reload()
      toast.success("Changement effectué");
      // toast.success(id);
    } catch (error) {
      toast.error("Une erreur s'est produite");
    }
  };

  const [users, setUsers] = useState([]);
  const [projetaction, setProjectaction] = useState({
    nom: "",
    dateDebut: "",
    dateSoumission: "",
    statut: "",
    id: "",
  });
  const [loading, setLoading] = useState(true);
  const [projet, setProjet] = useState([]);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isModalOpenedProjet, setIsModalOpenedProjet] = useState(false);
  const [depid, setDepid] = useState(0);
  const [type, setType] = useState("");
  const fetchProjet = async () => {
    const data = await projetApi.findAll();
    console.log(data);
    setProjet(data);
    setLoading(false);
  };
  let i = 1;
  const fetchUser = async () => {
    const data = await userApi.getUsers();
    setUsers(data);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    fetchProjet();
  }, []);
  return (
    <>
      <div className="projetadmin flex_main color_main">
        <SideBar />
        <div className="projet main_details">
          <Navbar />
          <div className="projet_main main_padding">
            <Header title="Gestion des projets">
              <button
                onClick={() => {
                  setDepid(0);
                  setIsModalOpened(true);
                  setType("AJOUTER_PROJET");
                }}
              >
                Assigner un projet
              </button>
            </Header>
          </div>
          <table>
            <thead>
              <tr>
                <th>N°</th>
                <th>Projet</th>
                <th>Date de Debut - Soumission</th>
                <th>Employés</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            {!loading && (
              <tbody>
                {projet.map((proj, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{proj.nom}</td>
                    <td>
                      {" "}
                      {moment(proj.dateDebut).format("DD/MM/YYYY")} au{" "}
                      {moment(proj.dateSoumission).format("DD/MM/YYYY")}
                    </td>
                    <td>
                      {proj.employe.map((u) => u.firstName + " " + u.lastName)}
                    </td>
                    <td>{proj.statut}</td>
                    <td
                      // onClick={() => {
                      //   setIsModalOpenedProjet(true);
                      // }}
                      className="actions_users"
                    >
                      {proj.statut === "EN COURS" ? (
                        <>
                          {" "}
                          <button onClick={() => handleTerminer(proj.id)}>Terminer le projet</button>
                          <button onClick={() => handleAnnuler(proj.id)}>
                            Annuler le projet
                          </button>
                        </>
                       
                      ) : proj.statut === "ANNULE" ? (
                        <>
                          <button onClick={() => handleTerminer(proj.id)}>Terminer le projet</button>
                          <button onClick={() => handleCours(proj.id)}>Mettre en cours</button>
                        </>
                      ) : (
                        <button>Projet Terminé</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {loading && <TableLoader />}
        </div>
      </div>
      <ProjetModal
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        Type={type}
        id={depid}
        tables={projet}
        setTables={setProjet}
        setDepid={setDepid}
        users={users}
      />
      <ActionProjet
        isOpenedProjet={isModalOpenedProjet}
        onCloseProjet={() => setIsModalOpenedProjet(false)}
      />
    </>
  );
}

export default Projet;
