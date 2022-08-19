import React, { useState, useEffect } from "react";
import Title from "../../Components/title/Title";
import { Link } from "react-router-dom";
import "./congeDashboard.css";
import congeApi from "../../services/congeApi";
import moment from "moment";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import DashboardPosteLoader from "../../Components/loaders/DashboardPosteLoader";
import globalFunction from "../../services/globalFunction";
import MixedChartsConge from "../../Components/chart/MixedChartsConge";
import CongeModalDashboard from "../../Components/modal/CongeModalDashboard";

const CongeDashboard = () => {
  const [conge, setConge] = useState({
    attente: 0,
    accepte: 0,
    rejete: 0,
  });
  const [annee, setAnnee] = useState(0);
  const [type, setType] = useState("");
  const [data_year,setDataYear]=useState([])
  const [conge_tab, setCongeTab] = useState([]);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const fetchConge = async () => {
    let annee_actuel = new Date().getFullYear();
    console.log(annee_actuel);
    // OBTIENS TOUTES LES DONNÉES
    const data = await congeApi.findAll();
    console.log(data);
    let annee_target = globalFunction.loadyears();
    setAnnee(globalFunction.loadyears());
    annee_target.map((a) => {
      const conge_filter = data.filter(
        (conge_fil) =>
          moment(conge_fil.cree).format("YYYY").toString() === a.toString()
      );
      console.log(conge_filter);
      setCongeTab([...conge_tab], conge_tab.push(conge_filter.length));
    });

    // FILTRE SEULEMENT LES ELEMENTS DE CETTE ANNEE
    const data_actual_year = data.filter(
      (d) =>
        moment(d.cree).format("YYYY").toString() === annee_actuel.toString()
    );
    setDataYear(data_actual_year)
    console.log(data_actual_year)
    data_actual_year.map((actual_year) => {
      console.log(actual_year);
      if (actual_year.status == "ACCEPTE") {
        setConge({ ...conge, accepte: ++conge.accepte });
      } else if (actual_year.status == "REJETEE") {
        setConge({ ...conge, rejete: ++conge.rejete });
      } else if (actual_year.status == "EN ATTENTE") {
        setConge({ ...conge, attente: ++conge.attente });
      }
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchConge();
  }, []);

  return (
    <>
      <div className="congeDashboard d-flex-4">
        {!loading && (
          <div className="centre">
            <Title nomdepage="Dashboard" subname="Tableau des congés">
              <button>
                <Link to="conge/list">Liste des congés</Link>
              </button>
            </Title>
            <div className="featured">
              <FeaturedInfo
                title="Demande acceptées cette année"
                chiffre={conge.accepte}
                onClick={() => {
                  setIsModalOpened(true);
                  setType("ACCEPTE_TYPE");
                }}
              />
              <FeaturedInfo
                title="Demande refusées cette année"
                chiffre={conge.rejete}
                onClick={() => {
                  setIsModalOpened(true);
                  setType("REJETE_TYPE");
                }}
              />
              <FeaturedInfo
                title="Demande en attente cette année"
                chiffre={conge.attente}
                onClick={() => {
                  setIsModalOpened(true);
                  setType("ATTENTE_TYPE");
                }}
              />
            </div>
            {/* TABLEAU EVOLUTIF DES CONGES */}
            <div className="flexAbsence">
              <div className="flex_fiche_absence graphe">
                <div className="container-box">
                  <h4>Tableau Comparatif des congés sur le plan annuel</h4>
                  <div className="stats-info">
                    <MixedChartsConge annee={annee} conge={conge_tab} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {loading && <DashboardPosteLoader />}
      </div>
      <CongeModalDashboard
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        type={type}
        conge={data_year}
      />
    </>
  );
};

export default CongeDashboard;
