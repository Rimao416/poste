import moment from "moment";
import React from "react";
import { createPortal } from "react-dom";
import { BiX } from "react-icons/bi";
import { Link } from "react-router-dom";
const CongeModalDashboard = ({ isOpened, onClose, type, conge }) => {
  if (!isOpened) {
    return null;
  }
  const ReturnValue = ({ your_type, tableau }) => {
    if (your_type == "ACCEPTE_TYPE") {
      console.log(tableau);
      const accepted_status = tableau.filter((t) => t.status === "ACCEPTE");
      console.log(accepted_status);
      return (
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Poste</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {accepted_status.map((employe) => (
              <tr key={employe.user.id}>
                <td>
                  {" "}
                  <img
                    src={employe.user.photo}
                    width={30}
                    style={{ borderRadius: "15px" }}
                    alt=""
                  />{" "}
                  {employe.user.firstName + " " + employe.user.lastName}
                </td>
                <td>{employe.user.poste.Designation}</td>
                <td>
                  Du{" "}
                  {moment(employe.DateDebut).format("DD-MM-YYYY") +
                    " au " +
                    moment(employe.DateFin).format("DD-MM-YYYY")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (your_type == "REJETE_TYPE") {
      const accepted_status = tableau.filter((t) => t.status === "REJETEE");
      console.log(accepted_status);
      return (
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Poste</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {accepted_status.map((employe) => (
              <tr key={employe.user.id}>
                <td>
                  {" "}
                  <img
                    src={employe.user.photo}
                    width={30}
                    style={{ borderRadius: "15px" }}
                    alt=""
                  />{" "}
                  {employe.user.firstName + " " + employe.user.lastName}
                </td>
                <td>{employe.user.poste.Designation}</td>
                <td>
                  Du{" "}
                  {moment(employe.DateDebut).format("DD-MM-YYYY") +
                    " au " +
                    moment(employe.DateFin).format("DD-MM-YYYY")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (your_type == "ATTENTE_TYPE") {
      const accepted_status = tableau.filter((t) => t.status === "EN ATTENTE");
      console.log(accepted_status);
      return (
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Poste</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {accepted_status.map((employe) => (
              <tr key={employe.user.id}>
                <td>
                  {" "}
                  <img
                    src={employe.user.photo}
                    width={30}
                    style={{ borderRadius: "15px" }}
                    alt=""
                  />{" "}
                  {employe.user.firstName + " " + employe.user.lastName}
                </td>
                <td>{employe.user.poste.Designation}</td>
                <td>
                  Du{" "}
                  {moment(employe.DateDebut).format("DD-MM-YYYY") +
                    " au " +
                    moment(employe.DateFin).format("DD-MM-YYYY")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };
  return createPortal(
    <div className="overlay">
      <div className="modal">
        <span id="cross">
          <BiX
            onClick={() => {
              onClose();
            }}
          />
        </span>

        <div className="modal-header">
          <h5 className="modal-title">Employés du poste</h5>
        </div>
        <div className="modal-body w-800">
          <ReturnValue your_type={type} tableau={conge} />
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default CongeModalDashboard;
