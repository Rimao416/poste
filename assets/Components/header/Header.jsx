import React from "react";
import "./header.css"
function Header({ title, children }) {
  return (
    <div className="headers">
      <h4>{title}</h4>
      {children}
      
    </div>
  );
}

export default Header;
