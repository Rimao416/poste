import React from "react";
import { Link } from "react-router-dom";
const List = ({link, goTo }) => {
  return (
    <>
      <Link to={goTo} className="link">
        <li>{link}</li>
      </Link>
    </>
  );
};

export default List;