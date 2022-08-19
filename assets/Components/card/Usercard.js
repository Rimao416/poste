import React from "react";

import Edit from "./sub_card/Edit";
import "./usercard.css";
const Usercard = ({ id, adresse, nom, prenom, photo, poste }) => {
  return (
    <>
      <div className="card_user" id={"user" + id} key={id}>
        <div className="profile_user">
          <img src={photo} alt="" />
        </div>

        <div className="user_details">
          <div className="card">
            <h4>
              {nom} {prenom}
            </h4>
            <h5>{poste}</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default Usercard;
