import moment from "moment";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./contrat.css";
import TableLoader from "../../Components/loaders/TableLoader";
import ContratModal from "../../Components/modal/ContratModal";
import Title from "../../Components/title/Title";
import { Link } from "react-router-dom";
import contratApi from "../../services/contratApi";
import globalFunction from "../../services/globalFunction";
const Contrat = () => {
  const [id, setId] = useState(0);
  const [contrats, setContrats] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpened, setIsModalOpened] = useState(false);
  // const [notification, setNotification] = useState(0);
  const fetchContrats = async () => {
    const data = await contratApi.findAllContratsUser();
    console.log(data);
    let i = 0;
    let ids = [];
    // PREMIER ETAPE: ENREGISTRER MES ID
    const inistialState = [];
    data.forEach((d) => {
      if (!ids.includes(d.user.id)) {
        ids.push(d.user.id);
      }
      // if (
      //   moment(d.DateFin).format("DD-MM-YYYY").toString() ===
      //   moment().format("DD-MM-YYYY").toString()
      // ) {
      //   i = i + 1;
      //   console.log(d);
      //   // setNotification(i);
      // }
    });
    // if (i > 0) {
    //   toast.info(
    //     i +
    //       " contrat" +
    //       (i > 1 ? "s" : "") +
    //       (i > 1 ? " prennent" : " prend") +
    //       " fin aujourd'hui"
    //   );
    // }

    // console.log(ids);
    // DEUXIEME ETAPE, POUR CHAQUE ID, TROUVER LE PLUS GRAND EN DATE
    ids.map((id) => {
      const result_filter_data = data.filter((d) => d.user.id === id);
      // console.log(result_filter_data[result_filter_data.length - 1]);
      // console.log(result_filter_data[result_filter_data.length - 1].salaires);
      inistialState.push(result_filter_data[result_filter_data.length - 1]);
    });
    setContrats(inistialState);
    // console.log(contrats);
    console.log(inistialState);
    setLoading(false);
    // setContrats(data);
  };
  useEffect(() => {
    fetchContrats();
  }, []);
  return (
    <>
      <div className="Contrat d-flex-4">
        <div className="centre">
          <Title nomdepage="Dashboard" subname="Liste des contrats">
            <Link to="contrat_type">
              <button>Voir les Types de Contrat</button>
            </Link>
          </Title>
          {!loading && (
            <>
              <div className="contrats">
                <table>
                  <thead>
                    <tr>
                      <th>Durée du contrat</th>
                      <th>Type</th>
                      <th>Nom</th>
                      <th>Salaire</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  {!loading && (
                    <tbody>
                      {/*                               moment(contrat.DateFin).format("DD-MM-YYYY") ===
                              moment().format("DD-MM-YYYY")
                                ? "contrat_expired"
                                : ""
 */}
                      {contrats.map((contrat, idx) => (
                        <>
                          <tr key={idx}>
                            <td
                              className={
                                globalFunction.isUndefined(contrat.DateFin)
                                  ? ""
                                  : moment(contrat.DateFin).format(
                                      "DD-MM-YYYY"
                                    ) === moment().format("DD-MM-YYYY")
                                  ? "contrat_expired"
                                  : ""
                              }
                            >
                              {moment(contrat.DateDebut).format("DD-MM-YYYY") +
                                " au "}
                              {globalFunction.isUndefined(contrat.DateFin)
                                ? "----"
                                : moment(contrat.DateFin).format("DD-MM-YYYY")}
                            </td>
                            <td>{contrat.type.nom}</td>
                            <td className="text-left">
                              <p>
                                {contrat.user.firstName +
                                  " " +
                                  contrat.user.lastName}{" "}
                              </p>
                              <span>
                                {contrat.user.poste.departement.Nom}
                                <span className="poste">
                                  {contrat.user.poste.Designation}
                                </span>
                              </span>
                            </td>
                            <td>
                              {contrat.salaires.map((salaire, idx) => (
                                <>
                                  {contrat.salaires.length - 1 === idx &&
                                    salaire.montant}{" "}
                                </>
                              ))}
                            </td>
                            <td>
                              <div className="form-group-button">
                                <button
                                  onClick={() => {
                                    setIsModalOpened(true);
                                    setType("CONTRAT_TYPE");
                                    setId(contrat.id);
                                  }}
                                >
                                  Rénouveller le contrat
                                </button>
                                <button
                                  onClick={() => {
                                    setIsModalOpened(true);
                                    setType("SALAIRE_TYPE");
                                    setId(parseInt(contrat.id));
                                  }}
                                >
                                  Ajuster le salaire
                                </button>
                              </div>
                              <span></span>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </>
          )}
          {loading && <TableLoader />}
        </div>
      </div>
      <ContratModal
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        type={type}
        contrats={contrats}
        id={id}
      />
    </>
  );
};

export default Contrat;
