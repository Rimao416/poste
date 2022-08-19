import React from "react";

const Table = ({ header_children, body_children }) => {
  return (
    <>
      <table>
        <thead>
          <tr>{header_children}</tr>
        </thead>

        <tbody>
          {body_children}
          {/* {employes.map((employe) => (
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
                  ))} */}
        </tbody>
      </table>
    </>
  );
};

export default Table;
