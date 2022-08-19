import moment from "moment";
import React, { useEffect, useState } from "react";
import MixedChartsDashboard from "../../Components/chart/MixedChartsDashboard";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import TableLoader from "../../Components/loaders/TableLoader";
import Title from "../../Components/title/Title";
import departementApi from "../../services/departementApi";
import employeApi from "../../services/employeApi";
import globalFunction from "../../services/globalFunction";
import postApi from "../../services/postApi";
import "./home.css";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [employeDash, setEmployeDash] = useState([]);
  const [departements, setDepartements] = useState([]);
  const [postes, setPostes] = useState([]);
  const [annee, setAnnee] = useState([]);
  // Charger les User
  const findUser = async () => {
    let initialState = [];
    const data = await employeApi.getUsers();
    setUsers(data);
    console.log(data);
    let annee_target = globalFunction.loadyears();
    setAnnee(globalFunction.loadyears());
    annee_target.map((a) => {
      const user_filter = data.filter(
        (user_fil) => moment(user_fil.cree).format("YYYY") === a.toString()
      );
      console.log(user_filter);
      initialState.push(user_filter.length);
    });
    setEmployeDash(initialState);
    setLoading(false);
  };
  // Charger les postes

  const findPostes = async () => {
    const data = await postApi.findAll();
    setPostes(data);
  };

  // Charger les départements
  const findDepartements = async () => {
    const data = await departementApi.findAll();
    setDepartements(data);
  };
  useEffect(() => {
    findDepartements();
  }, []);

  // Charger les Users depuis le UseEffect

  useEffect(() => {
    findUser();
  }, []);

  // Charger les Deps depuis le UseEffect

  useEffect(() => {
    findPostes();
  }, []);
  // Charger les Postes depuis le UseEffect

  return (
    <div className="home d-flex-4">
      <Title nomdepage="Tableau de Bord"></Title>
      <div className="featured">
        <FeaturedInfo
          title="Nombre d'employés"
          chiffre={users.length}
          // onClick={() => {
          //   setIsModalOpened(true);
          //   setType("ACCEPTE_TYPE");
          // }}
        />
        <FeaturedInfo
          title="Nombre total des départements"
          chiffre={departements.length}
          // onClick={() => {
          //   setIsModalOpened(true);
          //   setType("REJETE_TYPE");
          // }}
        />
        <FeaturedInfo
          title="Nombre des postes"
          chiffre={postes.length}
          // onClick={() => {
          //   setIsModalOpened(true);
          //   setType("ATTENTE_TYPE");
          // }}
        />
      </div>
      <div className="flexAbsence">
        <div className="flex_fiche_absence graphe">
          <div className="container-box">
            <h4>Tableau Comparatif des employés au sein de l'entreprise</h4>
            {!loading && (
              <div className="stats-info">
                <MixedChartsDashboard annee={annee} employee={employeDash} />
                {/* <Mixe annee={annee} conge={conge_tab} /> */}
              </div>
            )}
            {loading && <TableLoader />}
          </div>
        </div>
      </div>

      <div className="flexAbsence">
        <div className="flex_fiche_absence">
          <div className="container-box">
            <h4>Quelques Départements</h4>
            {departements.map((p, idx) => (
              <>
                {idx < 5 && (
                  <div className="stats-info">
                    <p>{p.Nom}</p>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
        <div className="flex_fiche_absence">
          <div className="container-box">
            <h4>Quelques Employés</h4>
            {users.map((u, idx) => (
              <>
                {idx < 5 && (
                  <div className="stats-info">
                    <p>{u.firstName + " " + u.lastName}</p>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
        <div className="flex_fiche_absence">
          <div className="container-box">
            <h4>Quelques Postes</h4>
            {postes.map((poste, idx) => (
              <>
                {idx < 5 && (
                  <div className="stats-info">
                    <p>{poste.Designation}</p>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
