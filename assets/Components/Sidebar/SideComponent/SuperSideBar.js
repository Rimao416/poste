import React from "react";
import SideBarList from "./SideBarList";
import List from "./List";
const SuperSideBar = () => {
  return (
    <>
      <SideBarList title="Dashboard">
        <List
          classname="sidebarListItem"
          link="Création d'un agent"
          goTo="/agent/creation"
        />
        <List
          classname="sidebarListItem"
          link="Profil Agent"
          goTo="/agent/list"
        />
      </SideBarList>
    </>
  );
};

export default SuperSideBar;
