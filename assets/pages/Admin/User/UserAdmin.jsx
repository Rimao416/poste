import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "../../../Components/header/Header";
import Navbar from "../../../Components/navbar/Navbar";
import Modal from "../../../Components/modal/Modal";
import TableLoader from "../../../Components/loaders/TableLoader";
import {Link} from "react-router-dom";
import SideBar from "../../../Components/sidebar/SideBar";
import "./useradmin.css";
function UserAdmin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchEmployes = async () => {
    try {
      const data = await axios
        .get("http://localhost:8000/api/users")
        .then((response) => response.data);
      setUsers(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      // console.log(error.response);
    }
  };
  useEffect(() => {
    fetchEmployes();
  }, []);

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [depid, setDepid] = useState(0);
  const [type, setType] = useState("");
  return (
    <>
      <div className="useradmin flex_main color_main">
        <SideBar />
        <div className="user main_details">
          <Navbar />
          <div className="user_main main_padding">
            <div className="users_headers">
              <Header title="Gestion des utilisateurs">
                <button
                  onClick={() => {
                    setDepid(0);
                    setIsModalOpened(true);
                    setType("AJOUTER_UTILISATEUR");
                  }}
                >
                  Ajouter des utilisateurs
                </button>
              </Header>

              {/*  */}
            </div>

            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Genre</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              {!loading && (
                <tbody>
                  {users.map((user) => (
                    <tr>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.sexe}</td>
                      <td>{user.telephone}</td>
                      <td>{user.email}</td>
                      <td className="actions_users">
                        <button>
                          <Link to={"/profile/" + user.id}>Voir plus</Link>
                        </button>
                        <button                           onClick={() => {
                            setIsModalOpened(true);
                            setDepid(user.id);
                            setType("SUPPRIMER_UTILISATEUR");
                          }}
                          id={user.id}>Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            {loading && <TableLoader />}
          </div>
        </div>
      </div>
      <Modal
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        Type={type}
        id={depid}
        tables={users}
        setTables={setUsers}
        setDepid={setDepid}
      />
    </>
  );
}

export default UserAdmin;
