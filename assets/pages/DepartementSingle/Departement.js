import axios from "axios";
import React, { useState, useEffect } from "react";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import Title from "../../Components/title/Title";
import departementApi from "../../services/departementApi";
import DashboardLoader from "../../Components/loaders/DashboardLoader";
import MixedCharts from "../../Components/chart/MixedCharts";
import globalFunction from "../../services/globalFunction";
import moment from "moment";
import DepartementModal from "../../Components/modal/DepartementModal";
export default function Departement(props) {
  const [annee, setAnnee] = useState([]);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [type, setType] = useState("");

  const [poste_dep, setPosteDep] = useState([]);
  const [user_dep, setUserDep] = useState([]);
  const [loading, setLoading] = useState({
    poste: true,
    employe: true,
  });
  const [departement, setDepartement] = useState({
    poste: "",
    employe: "",
  });

  const [departements, setDepartements] = useState([]);
  var nombre_employe = 0;
  const departement_id = props.match.params.id;
  const fetchDataDepartement = async (id) => {
    let annee_actuel = parseInt(new Date().getFullYear);
    const data = await departementApi
      .departementJoinPoste(id)
      .then((response) => response.data);
    setDepartements(data);
    setAnnee(globalFunction.loadyears());
    let annee_target = globalFunction.loadyears();
    console.log(annee_target);

    annee_target.map((d) => {
      console.log(d);
      const dep_filter = data.filter(
        (dep_fil) => moment(dep_fil.cree).format("YYYY") === d.toString()
      );
      console.log(dep_filter.length);
      setPosteDep([...poste_dep], poste_dep.push(dep_filter.length));

      // console.log(dep_filter);
      // if (dep_filter.length == 0) {
      //   setUserDep([...user_dep], user_dep.push(0));
      // } else {
      //   dep_filter.map((dep_map) => {
      //     if (dep_map.users.length == 0) {
      //       setUserDep([...user_dep], user_dep.push(0));
      //     } else {
      //       const { users } = dep_map;
      //       const user_filter = users.filter(
      //         (u) =>
      //           moment(u.cree).format("YYYY").toString() ===
      //           moment(dep_map.cree).format("YYYY").toString()
      //       );
      //       setUserDep([...user_dep], user_dep.push(user_filter.length));
      //     }
      //   });
      //   // setUserDep([...user_dep], user_dep.push(5));
      // }
    });
    data.forEach((d) => (nombre_employe += d.users.length));
    // console.log(nombre_employe);
    setDepartement({ poste: data.length, employe: nombre_employe });
    setLoading({ poste: false, employe: false });
  };
  useEffect(() => {
    fetchDataDepartement(departement_id);
  }, []);
  
  // useEffect(() => {
  //   setAnnee(globalFunction.loadyears());

  // }, []);
  return (
    <>
      <div className="departement d-flex-4">
        <div className="centre">
          <Title nomdepage="Dashboard" subname="departement" />
          <div className="featured">
            {!loading.poste && (
              <FeaturedInfo
                title="Nombre des postes"
                chiffre={departement.poste}
                stat="+"
                onClick={() => {
                  setIsModalOpened(true);
                  setType("POSTE_TYPE");
                }}
              />
            )}
            {loading.poste && <DashboardLoader />}

            {!loading.employe && (
              <>
                <FeaturedInfo
                  title="Nombre total des employés"
                  chiffre={departement.employe}
                  stat="+"
                  onClick={() => {
                    setIsModalOpened(true);
                    setType("POSTE_EMPLOYE");
                  }}
                />
              </>
            )}
            {loading.employe && <DashboardLoader />}
          </div>
          <div className="flexAbsence">
            <div className="flex_fiche_absence graphe">
              <div className="container-box">
                <h4>Département</h4>
                <div className="stats-info">
                  {!loading.employe && (
                    <>
                      <MixedCharts
                        poste={poste_dep}
                        annee={annee}
                        employee={user_dep}
                      />
                    </>
                  )}
                  {loading.employe && <DashboardLoader />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DepartementModal
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        departements={departements}
        type={type}
        setType={setType}
      />
    </>
  );
}
