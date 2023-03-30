import React, { useState, useEffect } from "react";
import Header from "../../Components/header/Header";
import Navbar from "../../Components/navbar/Navbar";
import SideBar from "../../Components/sidebar/SideBar";
import jwtDecode from "jwt-decode";
import authApi from "../../services/authApi";
import userApi from "../../services/userApi";
import GithubProfile from "../../Components/loaders/GithubLoader";
import "./profile.css";
import Modal from "../../Components/modal/Modal";

function Profile(props) {
  const [loading, setLoading] = useState(true);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [depid, setDepid] = useState(0);
  const [type, setType] = useState("");
  const [modifie, setModifie] = useState(true);
  const [user, setUsers] = useState([]);
  const fetchData = async (id) => {
    const data = await userApi.find(id);
    // setUserData(data);
    setUsers(data);
    console.log(data);
    setLoading(false);
  };

  let profile_id = props.match.params.id;
  if (props.match.params.id === undefined) {
    const token = window.localStorage.getItem("authToken");
    profile_id = jwtDecode(token).id;
  } else {
    profile_id = props.match.params.id;
  }
  console.log(profile_id);

  useEffect(() => {
    const userInfo = authApi.getUserInfo();
    if (userInfo.includes("ROLE_ADMIN") || userInfo.includes("ROLE_USER")) {
      //  && props.match.id != jwtDecode(window.localStorage.getItem("authToken")).id
      console.log(jwtDecode(window.localStorage.getItem("authToken")).id);
      // if(jwtDecode(window.localStorage.getItem("authToken")).id===)
      setModifie(false);
    }
    if (props.match.params.id != undefined) {
      console.log("Justement");
      console.log(jwtDecode(window.localStorage.getItem("authToken")).id);
      if (
        jwtDecode(window.localStorage.getItem("authToken")).id.toString() ===
        props.match.params.id.toString()
      ) {
        setModifie(true);
        console.log("oui");
      }
    }
  }, []);
  useEffect(() => {
    fetchData(profile_id);
    setDepid(profile_id)
  }, [profile_id]);

  return (
    <>
      <div className="useradmin flex_main color_main">
        <SideBar />
        {!loading && (
          <div className="profile main_details">
            <Navbar />
            <div className="profile_main main_padding">
              <Header title="Profile">
                <button
                  onClick={() => {
                    setDepid(user.id);
                    setIsModalOpened(true);
                    setType("AJOUTER_UTILISATEUR");
                  }}
                >Modifier</button>
              </Header>
              <div className="users_informations">
                <div className="left_info">
                  <ul>
                    <li>Personnelle</li>
                    <li>Congés</li>
                  </ul>

                  <h3>Informations Personnelles</h3>
                  <p>Toutes les informatiions vous concernant sont ici</p>

                  <div className="sub_infos">
                    <div className="left_sub">
                      <h5>Mail</h5>
                      <h5>Nom</h5>
                      <h5>Prenom</h5>
                      <h5>Genre</h5>
                      <h5>Adresse</h5>
                      <h5>Telephone</h5>
                      <h5>Date de naissance</h5>
                    </div>
                    <div className="right_sub">
                      <h5>{user.email}</h5>
                      <h5>{user.firstName.toString()}</h5>
                      <h5>{user.lastName}</h5>
                      <h5>{user.sexe}</h5>
                      <h5>{user.adresse}</h5>
                      <h5>{user.telephone===null ? "08":user.telephone}</h5>
                      <h5>{user.dateNaissance}</h5>
                    </div>
                  </div>
                </div>
                <div className="right_info">
                  <img src={user.photo} alt="" />
                  <p>Utilisateur</p>
                  <h4>{user.firstName + " "+user.lastName}</h4>
                </div>
              </div>
            </div>
          </div>
        )}
        {loading && <GithubProfile />}
      </div>
      <Modal
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        Type={type}
        id={depid}
        tables={user}
        setTables={setUsers}
        setDepid={setDepid}
      />
    </>
  );
}

export default Profile;
