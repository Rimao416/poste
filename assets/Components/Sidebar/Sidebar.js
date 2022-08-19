import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import authApi from "../../services/authApi";
import "./Sidebar.css";
import AuthContext from "../../contexts/AuthContext";
import AgentSideBar from "./SideComponent/AgentSideBar";
import EmployeSideBar from "./SideComponent/EmployeSideBar";
import SuperSideBar from "./SideComponent/SuperSideBar";
export default function Sidebar({ history }) {
  const roles = authApi.getUserInfo();
  console.log(roles);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const handleLogout = () => {
    authApi.logout();
    setIsAuthenticated(false);
    history.push("/login");
  };
  const CheckRole = (role) => {
    if (role.includes("ROLE_AGENT")) {
      return <AgentSideBar />;
    } else if (role.includes("ROLE_EMPLOYE")) {
      return <EmployeSideBar />;
    } else {
      return <SuperSideBar />;
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        {CheckRole(roles)}

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li onClick={handleLogout} className="sidebarListItem">
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
