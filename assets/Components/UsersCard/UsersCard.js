import React, { useState, useEffect } from "react";
import authApi from "../../services/authApi";
import Usercard from "../card/Usercard";
import { Link } from "react-router-dom";
import './usersCard.css'

export default function UsersCard({ view, employes }) {
  function CheckRoles({ roles, user }) {
    let link = "";
    if (user.roles.includes("ROLE_EMPLOYE") && roles.includes("ROLE_SUPER")) {
      link = <Link to={"/employee/profile/" + user.id}>Voir plus</Link>;
    }
    if (user.roles.includes("ROLE_EMPLOYE") && roles.includes("ROLE_AGENT")) {
      link = <Link to={"/employee/profile/" + user.id}>Voir plus</Link>;
    } else if (
      user.roles.includes("ROLE_AGENT") &&
      roles.includes("ROLE_SUPER")
    ) {
      link = "------------";
    }
    return link;
  }

  const [filteredData, setFilteredData] = useState([]);
  //   const [userInfo, setUserInfo] = useState([]);
  let userInfo = authApi.getUserInfo();
  useEffect(() => {
    userInfo = authApi.getUserInfo();
    console.log(userInfo);
    console.log(employes);
    // setUserInfo(authApi.getUserInfo());
    // const [type, setType] = useState("");
    if (userInfo.includes("ROLE_AGENT")) {
      const filtered = employes.filter((employe) =>
        employe.roles.includes("ROLE_EMPLOYE")
      );
      console.log(filtered);

      setFilteredData(filtered);
    } else if (userInfo.includes("ROLE_SUPER")) {
      const filtered = employes.filter((employe) =>
        employe.roles.includes("ROLE_AGENT")
      );
      //   setFilteredData(employes);
      console.log(filtered);
      setFilteredData(filtered);
    }
  }, []);

  return (
    <>
      {view === "card" ? (
        <>
          <div className="usersCard">
            {filteredData.map((employe) => (
              <>
                <Usercard
                  id={employe.id}
                  adresse={employe.adresse}
                  nom={employe.firstName}
                  prenom={employe.lastName}
                  photo={employe.photo}
                  poste={employe.poste.Designation}
                />
              </>
            ))}
          </div>
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
            <tbody>
              {filteredData.map((employe) => (
                <>
                  <tr key={employe.id}>
                    <td>{employe.firstName}</td>
                    <td>{employe.lastName}</td>
                    <td>{employe.email}</td>
                    <td>{employe.adresse}</td>
                    <td>
                      <div className="form-group-button">
                        <div className="form-group-button">
                          <button>
                            {userInfo.includes("ROLE_SUPER") ? (
                              <Link to={"/agent/list/" + employe.id}>
                                Voir plus
                              </Link>
                            ) : (
                              <Link to={"/employee/profile/" + employe.id}>
                                Voir plus
                              </Link>
                            )}
                          </button>
                          <button
                          // onClick={() => {
                          //   setDepid(employe.id);
                          //   setIsModalOpened(true);
                          //   setType("SUPPRIMER_EMPLOYE");
                          // }}
                          >
                            Supprimer
                          </button>
                        </div>
                        <span></span>
                      </div>
                      <span></span>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
