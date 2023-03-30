import React from "react";

function AjouterProjet({ handleSubmit, projet, handleChange, id, users }) {
  return (
    <>
      <form className="formulaire" onSubmit={handleSubmit}>
        <div className="form-grap">
          <div className="form-group">
            <label htmlFor="departement" className="label-input">
              Nom
            </label>
            <input
              type="text"
              defaultValue={projet.nom}
              required
              name="nom"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nom" className="label-input">
              Date de debut
            </label>
            <input
              type="date"
              defaultValue={projet.dateDebut}
              required
              name="dateDebut"
              onChange={handleChange}
            />
            {/* {errors.lastName && (
                      <p className="error-input">{errors.lastName}</p>
                    )} */}
          </div>
        </div>
        <div className="form-grap">
          <div className="form-group">
            <label htmlFor="departement" className="label-input">
              Date de soumission
            </label>
            <input
              type="date"
              defaultValue={projet.dateSoumission}
              required
              name="dateSoumission"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nom" className="label-input">
              Employé
            </label>
            <select onChange={handleChange} name="employe" id="" required>
              <option>---------------</option>
              {users.map((u) => (
                <option value={u.id}>{u.firstName}</option>
              ))}
            </select>

            {/* {errors.lastName && (
                      <p className="error-input">{errors.lastName}</p>
                    )} */}
          </div>
        </div>

        <button type="submit">{id === 0 ? "Envoyer" : "Modifier"}</button>
      </form>
    </>
  );
}

export default AjouterProjet;
