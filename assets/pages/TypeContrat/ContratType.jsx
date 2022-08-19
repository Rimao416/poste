import React, { useState, useEffect } from "react";
// import "./contratType.css";
import Title from "../../Components/title/Title";
import { Link } from "react-router-dom";
import ContratTypeModal from "../../Components/modal/ContratTypeModal";
import contratTypeApi from "../../services/contratTypeApi";
export default function ContratType() {
  var i = 1;

  const [depid, setDepid] = useState(0);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [contrats, setContrats] = useState([]);
  const [search, setSearch] = useState("");
  const fetchContratType = async () => {
    const data = await contratTypeApi.findAll();
    setContrats(data);
    console.log(data);
  };
  useEffect(() => {
    fetchContratType();
  }, []);

  return (
    <>
      <div className="ContratType d-flex-4">
        <div className="centre">
          <Title nomdepage="Dashboard" subname="Liste des contrats">
            <button
              onClick={() => {
                setDepid(0);
                setIsModalOpened(true);
                setType("AJOUTER_TYPE");
              }}
            >
              Ajouter un de Contrat
            </button>
          </Title>
        </div>
        <div className="header-input">
          <input
            type="text"
            placeholder="ex Informatique"
            name="search"
            //   onChange={handleSearch}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Contrats</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* {!loading && ( */}
          <tbody>
            {contrats.map((contrat) => (
              <tr key={contrat.id}>
                <td>{i++}</td>
                <td>{contrat.nom}</td>
                <td>
                  <div className="form-group-button">
                    <button
                      className="info"
                      onClick={() => {
                        setDepid(contrat.id);
                        setIsModalOpened(true);
                        setType("AJOUTER_TYPE");
                      }}
                      id={contrat.id}
                    >
                      Modifier
                    </button>
                    <button
                      className="danger"
                      onClick={() => {
                        setIsModalOpened(true);
                        setDepid(contrat.id);
                        setType("SUPPRIMER_TYPE");
                      }}
                      id={contrat.id}
                    >
                      Supprimer
                    </button>
                    {/* <button className="see">
                  
                      Button
                    </button> */}
                  </div>
                  <span></span>
                </td>
              </tr>
            ))}
          </tbody>
          {/** )} */}
        </table>
      </div>
      <ContratTypeModal
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        Type={type}
        id={depid}
        tables={contrats}
        setTables={setContrats}
        setDepid={setDepid}
      />
    </>
  );
}
