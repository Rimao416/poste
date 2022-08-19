import React, { useState, useEffect } from "react";
import Usercard from "../../Components/card/Usercard";
import Title from "../../Components/title/Title";
import TableLoader from "../../Components/loaders/TableLoader";
import { Link } from "react-router-dom";
import axios from "axios";
import { BsFillGrid3X3GapFill, BsFillGrid1X2Fill } from "react-icons/bs";

import "./agentlist.css";
const AgentList = () => {
  const [view, setView] = useState("table");
  const [employes, setEmploye] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchEmployes = async () => {
    try {
      const data = await axios
        .get("http://localhost:8000/api/users")
        .then((response) => response.data);
      setEmploye(data);
      console.log(data[0].roles);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchEmployes();
  }, []);
  return (
    <div className="employee">
      {/** ------------------------- PARTIE DU TITRE -------------------------------------*/}
      <div className="head">
        <Title nomdepage="Dashboard" subname="Agent-Liste">
          <span onClick={() => setView("card")}>
            <BsFillGrid1X2Fill />
          </span>
          <span onClick={() => setView("table")}>
            <BsFillGrid3X3GapFill />
          </span>
          <button
            onClick={() => {
              setIsModalOpened(true);
              setDepid(0);
              setType("AJOUTER_EMPLOYE");
            }}
          >
            Ajouter un un Employé
          </button>
        </Title>
      </div>
      <div className="header-input">
        <input type="text" placeholder="ex Omari Kayumba" name="" />
        <input
          type="text"
          placeholder="ex. mariem@gmail.com"
          value=""
          name=""
        />
        <input type="text" placeholder="15" value="" name="" />
      </div>
      {view == "card" ? (
        <>
          {employes.map((employe) => (
            <Usercard
              id={employe.id}
              adresse={employe.adresse}
              nom={employe.firstName}
              prenom={employe.lastName}
              photo={employe.photo}
              poste={employe.poste.Designation}
              venu={employe.comeAt}
              isOpened={isModalOpened}
              onClose={() => setIsModalOpened(false)}
              onOpen={() => setIsModalOpened(true)}
              setId={setDepid}
              type={type}
              setType={setType}
            />
          ))}
        </>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Mail</th>
                <th>Adresse</th>
                <th>Actions</th>
              </tr>
            </thead>
            {!loading && (
              <tbody>
                {employes.map((employe) => (
                  <>
                    {employe.roles.includes("ROLE_AGENT") && (
                      <tr key={employe.id}>
                        <td>{employe.firstName}</td>
                        <td>{employe.lastName}</td>
                        <td>{employe.email}</td>
                        <td>{employe.adresse}</td>
                        <td>
                          <div className="form-group-button">
                            <button>
                              <Link to={"/employee/profile/" + employe.id}>
                                Voir l'employé
                              </Link>
                            </button>
                          </div>
                          <span></span>
                        </td>
                      </tr>
                    )}{" "}
                  </>
                ))}
              </tbody>
            )}
          </table>
          {loading && <TableLoader />}
        </>
      )}
    </div>
  );
};

export default AgentList;
