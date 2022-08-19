import React from "react";

export default function tableCard() {
  return (
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
      {!loading && (
        <tbody>
          {filteredEmploye.map((employe) => (
            <>
              {employe.roles.includes("ROLE_EMPLOYE") && (
                <tr key={employe.id}>
                  <td>{employe.firstName}</td>
                  <td>{employe.lastName}</td>
                  <td>{employe.email}</td>
                  <td>{employe.adresse}</td>
                  <td>
                    <div className="form-group-button">
                      <button>
                        <Link to={"employee/profile/" + employe.id}>
                          Voir plus
                        </Link>
                      </button>
                      <button
                        onClick={() => {
                          setDepid(employe.id);
                          setIsModalOpened(true);
                          setType("SUPPRIMER_EMPLOYE");
                        }}
                      >
                        Supprimer
                      </button>
                    </div>
                    <span></span>
                  </td>
                </tr>
              )}{" "}
            </>
          ))}
        </tbody>
      )}
    </table>
  );
}
