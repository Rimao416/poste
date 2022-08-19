import React, { useState, useEffect } from "react";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import MixedChartsPoste from "../../Components/chart/MixedChartsPoste";
import Title from "../../Components/title/Title";
import DashboardPosteLoader from "../../Components/loaders/DashboardPosteLoader";
import postApi from "../../services/postApi";
import globalFunction from "../../services/globalFunction";
import moment from "moment";
import PosteEmployeModal from "../../Components/modal/PosteEmployeModal";
export default function SinglePoste(props) {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const [poste, setPoste] = useState([]);
  const [poste_user, setPosteUser] = useState([]);
  const [annee, setAnnee] = useState([]);
  const poste_id = props.match.params.id;
  console.log(poste_id);
  // Charger tous les postes
  const fetchPosteEmploye = async (id) => {
    const data = await postApi.find(id);
    console.log(data);
    let annee_target = globalFunction.loadyears();
    setPoste(data);
    setAnnee(globalFunction.loadyears());
    annee_target.map((a) => {
      console.log("Pour l'année " + a);
      console.log(data);
      const user_filter = data.users.filter(
        (dep_fil) => moment(dep_fil.cree).format("YYYY") === a.toString()
      );
      setPosteUser([...poste_user], poste_user.push(user_filter.length));
    });

    setLoading(false);
  };
  useEffect(() => {
    fetchPosteEmploye(poste_id);
  }, []);
  return (
    <>
      <div className="singeposte d-flex-4">
        {!loading && (
          <div className="centre">
            <Title nomdepage="Dashboard" subname="Poste"></Title>
            <div className="featured" onClick={() => setIsModalOpened(true)}>
              <>
                <FeaturedInfo
                  title="Nombre d'employés"
                  chiffre={poste.users.length}
                />
              </>
            </div>
            <div className="flexAbsence">
              <div className="flex_fiche_absence graphe">
                <div className="container-box">
                  <div className="stats-info">
                    <MixedChartsPoste annee={annee} employee={poste_user} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {loading && <DashboardPosteLoader />}
      </div>
      <PosteEmployeModal
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        employes={poste.users}
      />
    </>
  );
}
