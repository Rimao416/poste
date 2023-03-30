import React, { useContext, useState } from "react";
import "./sidebar.css";
import authApi from "../../services/authApi";
import AuthContext from "../../contexts/AuthContext";
import AdminSidebar from "./SideComponent/AdminSidebar";
import UserSidebar from "./SideComponent/UserSidebar";
function SideBar({ history }) {
  const roles = authApi.getUserInfo();
  console.log(roles);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const handleLogout = () => {
    authApi.logout();
    setIsAuthenticated(false);
    history.push("/login");
  };
  const CheckRole = (role) => {
    console.log(role)
    if (role.includes("ROLE_ADMIN")) {
      return <AdminSidebar />;
    } else if (role.includes("ROLE_USER")) {
      return <UserSidebar />;
    }
  };
  return (
    <div className="sidebar">
      <h4 className="sidebar_title">La Poste</h4>
      <hr />

      <ul>
        {CheckRole(roles)}
        {/* Pour l'utilisateur, il faut deux pages: congé et profile */}
        {/* Pour l'admin, il faut Projet, Profile, Gestion des congés */}
        {/* <li>
          <a href="#">Gestion des utilisateurs</a>
        </li>
        <li>
          <a href="#">Gestion des projets</a>
        </li>
        <li>
          <a href="#">Gestion des congés</a>
        </li>
        <li>
          <a href="#">Gestion de 1</a>
        </li> */}
        <li onClick={handleLogout} className="sidebarListItem">
          Me deconnecter
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
