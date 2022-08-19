import React from "react";
import { BiX } from "react-icons/bi";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
export default function DepartementModal({
  isOpened,
  onClose,
  departements,
  type,
  setType,
}) {
  if (!isOpened) {
    return null;
  }
  const ReturnValue = (typeValue, tableau) => {
    console.log(typeValue);

    console.log(typeValue.typeValue);
    if (typeValue.typeValue == "POSTE_TYPE") {
      return (
        <>
          <table>
            <thead>
              <tr>
                <th>Poste</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {typeValue.tableau.map((tab) => (
                <>
                  <tr key={tab.id}>
                    <td>{tab.Designation}</td>
                    <td>
                      <Link to={"/postes/" + tab.id}>Voir plus</Link>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </>
      );
    } else {
      return (
        <>
          {" "}
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
                {typeValue.tableau.map((tab)=>(
                    <>
                        {tab.users.map((u)=>(
                             <tr key={u.id}>
                             <td>{u.firstName}</td>
                             <td>{u.lastName}</td>
                             <td>
                               <Link to={"/employee/profile/" + u.id}>Voir plus</Link>
                             </td>
                           </tr>
                        ))}
                    </>
                ))}
                {/* {typeValue.tableau.map(tab)=>{(
                    tab.users.length==0 ? 'Aucun'
                )}} */}
              {/* {typeValue.tableau.users.map((tab) => (()
                <>
                 
                </>
              ))} */}
            </tbody>
          </table>
        </>
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
          <h5 className="modal-title">
            {type == "POSTE_TYPE" ? "Liste des postes" : "Liste des employés"}
          </h5>
        </div>
        <div className="modal-body w-800">
          <ReturnValue typeValue={type} tableau={departements} />
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
