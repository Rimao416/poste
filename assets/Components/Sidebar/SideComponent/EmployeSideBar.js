import React from "react";
import SideBarList from "./SideBarList";
import List from "./List";
const EmployeSideBar = () => {
  return (
    <>
      <SideBarList title="Dashboard">
        <List
          classname="sidebarListItem"
          link="Accueil"
          goTo="/accueil"
        />
        <List
          classname="sidebarListItem"
          link="Gestion de congé"
          goTo="/congeuser"
        />
        <List
          classname="sidebarListItem"
          link="Profile"
          goTo="/employee/profile"
        />
      </SideBarList>
    </>
  );
};

export default EmployeSideBar;
