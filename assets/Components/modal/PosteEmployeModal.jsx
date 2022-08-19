import React from "react";
import { createPortal } from "react-dom";
import { BiX } from "react-icons/bi";
import { Link } from "react-router-dom";
const PosteEmployeModal = ({ isOpened, onClose,employes }) => {
console.log(employes)
  if (!isOpened) {
    return null;
  }
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
        <div className="modal-body">
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Mail</th>
                <th>Adresse</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employes.map((employe) => (
                <>
                  <tr key={employe.id}>
                    <td>{employe.firstName}</td>
                    <td>{employe.lastName}</td>
                    <td>{employe.email}</td>
                    <td>{employe.adresse}</td>
                    <td>
                      <Link to={"/employee/profile/"+employe.id}>Voir plus</Link>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default PosteEmployeModal;
