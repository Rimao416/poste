import React from "react";
import { createPortal } from "react-dom";
import { BiX } from "react-icons/bi";
function ActionProjet({ isOpenedProjet, onCloseProjet }) {
  if (!isOpenedProjet) {
    return null;
  }
  return createPortal(
    <div className="overlay">
      <div className="modal">
        <span id="cross">
          <BiX
            onClick={() => {
              onCloseProjet();
            //   setDepid(0);
            //   setProjet({
            //     nom: "",
            //     dateDebut: "",
            //     dateSoumission: "",
            //     employe: "",
            //     statut: "EN ATTENTE",
            //   });
            }}
          />
        </span>
        <div className="modal-header">
          <h5 className="modal-title">
            Assignation de projet
          </h5>
        </div>
        <div className="modal-body">

        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default ActionProjet;
