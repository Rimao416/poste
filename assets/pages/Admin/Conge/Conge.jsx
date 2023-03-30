import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import "./conge.css";
import { Link } from "react-router-dom";
import SideBar from "../../../Components/sidebar/SideBar";
import Navbar from "../../../Components/navbar/Navbar";
import Header from "../../../Components/header/Header";
import DetailDemande from "../../../Components/modal/DetailDemande";
import TableLoader from "../../../Components/loaders/TableLoader";
const Conge = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    nom: "",
    prenom: "",
    debutConge: "",
    finConge: "",
    raison: "",
    explication: "",
  });
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [search, setSearch] = useState("");
  function status(value) {
    if (value == "EN ATTENTE") {
      return "attente";
    } else if (value == "ACCEPTE") {
      return "accepte";
    } else if (value == "REJETEE") {
      return "refus";
    }
  }
  let i = 1;
  const fetchDemande = async () => {
    const data = await axios
      .get("http://localhost:8000/api/conges")
      .then((response) => response.data);
    console.log(data);
    setDemande(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchDemande();
  }, []);
  const [demande, setDemande] = useState([]);
  const handleSearch = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    console.log(search);
  };
  console.log(demande);
  // const filteredConge = demande.filter(
  //   (p) =>
  //     p.user.firstName.toLowerCase().includes(search.toLowerCase())||
  //     p.user.lastName.toLowerCase().includes(search.toLowerCase())||
  //     p.status.toLowerCase().includes(search.toLowerCase())
  // );
  return (
    <>
      <div className="congeadmin flex_main color_main">
        <SideBar />
        <div className="conge main_details">
          <Navbar />
          <div className="conge_main main_padding">
            <Header title="Gestion des conges"></Header>
          </div>
          <table>
            <thead>
              <tr>
                <th>N°</th>
                <th>Employé</th>
                <th>Date de Congé</th>
                <th>Raison</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {!loading && (
              <tbody>
                {demande.map((conge, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{conge.user.firstName + " " + conge.user.lastName}</td>
                    <td>
                      {" "}
                      {moment(conge.debutConge).format("DD/MM/YYYY")} au{" "}
                      {moment(conge.finConge).format("DD/MM/YYYY")}
                    </td>
                    <td>{conge.raison}</td>
                    <td>{conge.statut}</td>
                    <td
                      onClick={() => {
                        setIsModalOpened(true);
                      }}
                      className="actions_users"
                    >
                      <button
                        onClick={() =>
                          setUser({
                            firstName: conge.user.firstName,
                            lastName: conge.user.lastName,
                            debutConge: conge.debutConge,
                            finConge: conge.finConge,
                            raison: conge.raison,
                            statut: conge.statut,
                            id: conge.id,
                            profile: conge.user.photo,
                            explication: conge.explication,
                          })
                        }
                      >
                        Modifier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {loading && <TableLoader />}
        </div>
      </div>

      {/* <div className="conge d-flex-4">
        <div className="head d-head">
          <Title nomdepage="Dashboard" subname="Congé">
          </Title>
          <div className="header-input">
            <input
              type="text"
              placeholder="Entrez une valeur"
              name="nom"
              onChange={handleSearch}

            />
          </div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nom & Prenom</th>
                <th>Departement</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredConge.map((d) => (
                <tr key={d.id}>
                  <td>{i++}</td>
                  <td> {d.user.firstName + " " + d.user.lastName}</td>
                  <td>{d.user.poste.departement.Nom}</td>
                  <td>
                    <span className={status(d.status)}>{d.status}</span>
                  </td>
                  <td
                    onClick={() => {
                      setIsModalOpened(true);
                    }}
                  >
                    {" "}
                    <span
                      className="blue"
                      onClick={() =>
                        setUser({
                          nom: d.user.firstName,
                          prenom: d.user.lastName,
                          dateDebut: d.DateDebut,
                          dateFin: d.DateFin,
                          motif: d.motif,
                          status: d.status,
                          file: d.file,
                          id: d.id,
                          departement: d.user.poste.departement.Nom,
                          poste: d.user.poste.Designation,
                          profile: d.user.photo,
                          explication: d.explication,
                        })
                      }
                    >
                      Voir Plus
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
      <DetailDemande
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        user={user}
        setUser={setUser}
        demande={demande}
      />
    </>
  );
};

export default Conge;
